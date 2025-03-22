---
title: ThreadLocal原理和使用
date: 2024-08-15 10:29:00
updated: 2024-08-15 10:29:00
categories: 
- 学习
tags: 
- ThreadLocal
keywords:
- ThreadLocal
description: ThreadLocal原理和使用
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212142538.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212143341.png
---
## 一、ThreadLocal是什么？为什么要使用ThreadLocal？

### 1、ThreadLocal是什么？

ThreadLocal，即线程本地变量。如果你创建了一个ThreadLocal变量，那么访问这个变量的每个线程都会有这个变量的一个本地拷贝，多个线程操作这个变量的时候，实际是在操作自己本地内存里面的变量，从而起到线程隔离的作用，避免了并发场景下的线程安全问题。

通俗点来说，它能够提供线程的局部变量让每个线程都可以通过set/get方法来对这个局部变量进行操作，并且不会和其他线程的局部变量进行冲突，实现了线程的数据隔离。

> 作用：提供一个线程内公共变量（比如本次请求的用户信息），减少同一个线程内多个函数或者组件之间一些公共变量的传递的复杂度，或者为线程提供一个私有的变量副本，这样每一个线程都可以随意修改自己的变量副本，而不会对其他线程产生影响。

```java
//创建一个ThreadLocal变量
static ThreadLocal<String> localVariable = new ThreadLocal<>();COPY
```

### 2、为什么要使用ThreadLocal？

并发场景下，会存在多个线程同时修改一个共享变量的场景。这就可能会出现线性安全问题。

为了解决线性安全问题，可以用加锁的方式，比如使用synchronized 或者Lock。但是加锁的方式，可能会导致系统变慢。加锁示意图如下：
![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151013430.png)
还有另外一种方案，就是使用空间换时间的方式，即使用ThreadLocal。使用ThreadLocal类访问共享变量时，会在每个线程的本地，都保存一份共享变量的拷贝副本。多线程对共享变量修改时，实际上操作的是这个变量副本，从而保证线性安全。
![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151013240.png)

## 二、一个ThreadLocal的使用案例

日常开发中，ThreadLocal经常在日期转换工具类中出现，我们先来看个反例：

```java
/**
 * 日期工具类
 */
public class DateUtil {

    private static final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public static Date parse(String dateString) {
        Date date = null;
        try {
            date = simpleDateFormat.parse(dateString);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }
}COPY
```

我们在多线程环境跑DateUtil这个工具类：

```java
public static void main(String[] args) {
    ExecutorService executorService = Executors.newFixedThreadPool(10);
    for(int i = 0; i < 10; i++) {
        executorService.execute(() - > {
            System.out.println(DateUtil.parse("2022-07-24 16:34:30"));
        });
    }
    executorService.shutdown();
}COPY
```

运行后，发现报错了：
![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151013920.png)

如果在DateUtil工具类，加上ThreadLocal，运行则不会有这个问题：

```java
/**
 * 日期工具类
 */
public class DateUtil {

    private static ThreadLocal<SimpleDateFormat> dateFormatThreadLocal =
            ThreadLocal.withInitial(() -> new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));

    public static Date parse(String dateString) {
        Date date = null;
        try {
            date = dateFormatThreadLocal.get().parse(dateString);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }

    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(10);

        for (int i = 0; i < 10; i++) {
            executorService.execute(()->{
                System.out.println(DateUtil.parse("2022-07-24 16:34:30"));
            });
        }
        executorService.shutdown();
    }
}COPY
```

刚刚反例中，为什么会报错呢？这是因为SimpleDateFormat不是线性安全的，它以共享变量出现时，并发多线程场景下即会报错。

为什么加了ThreadLocal就不会有问题呢？并发场景下，ThreadLocal是如何保证的呢？我们接下来看看ThreadLocal的核心原理。

## 三、ThreadLocal的原理

ThreadLocal是一个壳子，真正的存储结构是ThreadLocal里有ThreadLocalMap这个内部类，而有趣的是，ThreadLocalMap的引用是在Thread上定义的。

### 1、ThreadLocal的内存结构图

为了有个宏观的认识，我们先来看下ThreadLocal的内存结构图
![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151013639.png)

从内存结构图，我们可以看到：

- Thread类中，有个ThreadLocal.ThreadLocalMap 的成员变量。
- ThreadLocalMap内部维护了Entry数组，每个Entry代表一个完整的对象，key是ThreadLocal对象的引用，value是ThreadLocal的泛型对象值。

### 2、关键源码分析

对照着几段关键源码来看，更容易理解一点哈~我们回到Thread类源码，可以看到成员变量ThreadLocalMap的初始值是为null

```java
public class Thread implements Runnable {
   //ThreadLocal.ThreadLocalMap是Thread的属性
   ThreadLocal.ThreadLocalMap threadLocals = null;
}COPY
```

ThreadLocalMap的关键源码如下：

```java
static class ThreadLocalMap {

    static class Entry extends WeakReference<ThreadLocal<?>> {
        /** The value associated with this ThreadLocal. */
        Object value;

        Entry(ThreadLocal<?> k, Object v) {
            super(k);
            value = v;
        }
    }
    //Entry数组
    private Entry[] table;

    // ThreadLocalMap的构造器，ThreadLocal作为key
    ThreadLocalMap(ThreadLocal<?> firstKey, Object firstValue) {
        table = new Entry[INITIAL_CAPACITY];
        int i = firstKey.threadLocalHashCode & (INITIAL_CAPACITY - 1);
        table[i] = new Entry(firstKey, firstValue);
        size = 1;
        setThreshold(INITIAL_CAPACITY);
    }
}COPY
```

ThreadLocal类中的关键set()方法：

```java
public void set(T value) {
        Thread t = Thread.currentThread(); //获取当前线程t
        ThreadLocalMap map = getMap(t);  //根据当前线程获取到ThreadLocalMap
        if (map != null)  //如果获取的ThreadLocalMap对象不为空
            map.set(this, value); //K，V设置到ThreadLocalMap中
        else
            createMap(t, value); //创建一个新的ThreadLocalMap
    }

     ThreadLocalMap getMap(Thread t) {
       return t.threadLocals; //返回Thread对象的ThreadLocalMap属性
    }

    void createMap(Thread t, T firstValue) { //调用ThreadLocalMap的构造函数
        t.threadLocals = new ThreadLocalMap(this, firstValue); this表示当前类ThreadLocal
    }
}COPY
```

ThreadLocal类中的关键get()方法

```java
public T get() {
    Thread t = Thread.currentThread(); //获取当前线程t
    ThreadLocalMap map = getMap(t); //根据当前线程获取到ThreadLocalMap
    if(map != null) { //如果获取的ThreadLocalMap对象不为空
        //由this（即ThreadLoca对象）得到对应的Value，即ThreadLocal的泛型值
        ThreadLocalMap.Entry e = map.getEntry(this);
        if(e != null) {@
            SuppressWarnings("unchecked")
            T result = (T) e.value;
            return result;
        }
    }
    return setInitialValue(); //初始化threadLocals成员变量的值
}

private T setInitialValue() {
    T value = initialValue(); //初始化value的值
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t); //以当前线程为key，获取threadLocals成员变量，它是一个ThreadLocalMap
    if(map != null) map.set(this, value); //K，V设置到ThreadLocalMap中
    else createMap(t, value); //实例化threadLocals成员变量
    return value;
}COPY
```

所以怎么回答ThreadLocal的实现原理？如下，最好是能结合以上结构图一起说明哈~

Thread线程类有一个类型为ThreadLocal.ThreadLocalMap的实例变量threadLocals，即每个线程都有一个属于自己的ThreadLocalMap。
ThreadLocalMap内部维护着Entry数组，每个Entry代表一个完整的对象，key是ThreadLocal对象的引用，value是ThreadLocal的泛型值。
并发多线程场景下，每个线程Thread，在往ThreadLocal里设置值的时候，都是往自己的ThreadLocalMap里存，读也是以某个ThreadLocal作为引用，在自己的map里找对应的key，从而可以实现了线程隔离。

了解完这几个核心方法后，有些小伙伴可能会有疑惑，ThreadLocalMap为什么要用ThreadLocal作为key呢？直接用线程Id不一样嘛？

## 四、为什么不直接用线程id作为ThreadLocalMap的key呢？

举个代码例子，如下：

```java
public class MyThreadLocalTest {
    private static final ThreadLocal<String> threadLocal1 = new ThreadLocal<>();
    private static final ThreadLocal<String> threadLocal2 = new ThreadLocal<>(); 
}COPY
```

这种场景：一个使用类，有两个共享变量，也就是说用了两个ThreadLocal成员变量的话。如果用线程id作为ThreadLocalMap的key，怎么区分哪个ThreadLocal成员变量呢？因此还是需要使用ThreadLocal作为Key来使用。每个ThreadLocal对象，都可以由threadLocalHashCode属性唯一区分的，每一个ThreadLocal对象都可以由这个对象的名字唯一区分（下面的例子）。看下ThreadLocal代码：

```java
public class ThreadLocal<T> {
  private final int threadLocalHashCode = nextHashCode();

  private static int nextHashCode() {
    return nextHashCode.getAndAdd(HASH_INCREMENT);
  }
}COPY
```

然后我们再来看下一个代码例子：

```java
public class ThreadLocalTest {

    public static void main(String[] args) {
        Thread t = new Thread(new Runnable() {
            public void run() {
                ThreadLocal<NameDTO> threadLocal1 = new ThreadLocal<>();
                threadLocal1.set(new NameDTO("t1"));
                System.out.println(threadLocal1.get());
                ThreadLocal<NameDTO> threadLocal2 = new ThreadLocal<>();
                threadLocal2.set(new NameDTO("t2"));
                System.out.println(threadLocal2.get());
            }});
        t.start();
    }

}
//运行结果
NameDTO{name='t1'}
NameDTO{name='t2'}COPY
```

再对比下这个图，可能就更清晰一点啦：
![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151013520.png)

## 五、ThreadLocal为什么会导致内存泄漏呢？

> 内存泄露：某个对象不再被使用，但是占着内存却不能够被回收。

### 1、弱引用导致的内存泄漏呢？

我们先来看看TreadLocal的引用示意图哈：
![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151014525.png)
关于ThreadLocal内存泄漏，网上比较流行的说法是这样的：

> ThreadLocalMap使用ThreadLocal的弱引用作为key，当ThreadLocal变量被手动设置为null，即一个ThreadLocal没有外部强引用来引用它，当系统GC时，ThreadLocal一定会被回收。这样的话，ThreadLocalMap中就会出现key为null的Entry，就没有办法访问这些key为null的Entry的value，如果当前线程再迟迟不结束的话(比如线程池的核心线程)，这些key为null的Entry的value就会一直存在一条强引用链：Thread变量 -> Thread对象 -> ThreaLocalMap -> Entry -> value -> Object 永远无法回收，造成内存泄漏。

当ThreadLocal变量被手动设置为null后的引用链图：
![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151014996.png)
实际上，ThreadLocalMap的设计中已经考虑到这种情况。所以也加上了一些防护措施：即在ThreadLocal的get,set,remove方法，都会清除线程ThreadLocalMap里所有key为null的value。

源代码中，是有体现的，如ThreadLocalMap的set方法：

```java
private void set(ThreadLocal <? > key, Object value) {
    Entry[] tab = table;
    int len = tab.length;
    int i = key.threadLocalHashCode & (len - 1);
    for(Entry e = tab[i]; e != null; e = tab[i = nextIndex(i, len)]) {
        ThreadLocal <? > k = e.get();
        if(k == key) {
            e.value = value;
            return;
        }
        //如果k等于null,则说明该索引位之前放的key(threadLocal对象)被回收了,这通常是因为外部将threadLocal变量置为null,
        //又因为entry对threadLocal持有的是弱引用,一轮GC过后,对象被回收。
        //这种情况下,既然用户代码都已经将threadLocal置为null,那么也就没打算再通过该对象作为key去取到之前放入threadLocalMap的value, 因此ThreadLocalMap中会直接替换调这种不新鲜的entry。
        if(k == null) {
            replaceStaleEntry(key, value, i);
            return;
        }
    }
    tab[i] = new Entry(key, value);
    int sz = ++size;
    //触发一次Log2(N)复杂度的扫描,目的是清除过期Entry  
    if(!cleanSomeSlots(i, sz) && sz >= threshold) rehash();
}COPY
```

如ThreadLocal的get方法：

```java
 public T get() {
     Thread t = Thread.currentThread();
     ThreadLocalMap map = getMap(t);
     if(map != null) {
         //去ThreadLocalMap获取Entry，方法里面有key==null的清除逻辑
         ThreadLocalMap.Entry e = map.getEntry(this);
         if(e != null) {@
             SuppressWarnings("unchecked")
             T result = (T) e.value;
             return result;
         }
     }
     return setInitialValue();
 }
 private Entry getEntry(ThreadLocal <? > key) {
     int i = key.threadLocalHashCode & (table.length - 1);
     Entry e = table[i];
     if(e != null && e.get() == key) return e;
     else
         //里面有key==null的清除逻辑
         return getEntryAfterMiss(key, i, e);
 }

 private Entry getEntryAfterMiss(ThreadLocal <? > key, int i, Entry e) {
     Entry[] tab = table;
     int len = tab.length;
     while(e != null) {
         ThreadLocal <? > k = e.get();
         if(k == key) return e;
         // Entry的key为null,则表明没有外部引用,且被GC回收,是一个过期Entry
         if(k == null) expungeStaleEntry(i); //删除过期的Entry
         else i = nextIndex(i, len);
         e = tab[i];
     }
     return null;
 }COPY
```

### 2、key是弱引用，GC回收会影响ThreadLocal的正常工作嘛？

到这里，有些小伙伴可能有疑问，ThreadLocal的key既然是弱引用.会不会GC贸然把key回收掉，进而影响ThreadLocal的正常使用？

> 弱引用：具有弱引用的对象拥有更短暂的生命周期。如果一个对象只有弱引用存在了，则下次GC将会回收掉该对象（不管当前内存空间足够与否）

其实不会的，因为有ThreadLocal变量引用着它，是不会被GC回收的，除非手动把ThreadLocal变量设置为null，我们可以跑个demo来验证一下：

```java
public class WeakReferenceTest {
    public static void main(String[] args) {
        Object object = new Object();
        WeakReference < Object > testWeakReference = new WeakReference < > (object);
        System.out.println("GC回收之前，弱引用：" + testWeakReference.get());
        //触发系统垃圾回收
        System.gc();
        System.out.println("GC回收之后，弱引用：" + testWeakReference.get());
        //手动设置为object对象为null
        object = null;
        System.gc();
        System.out.println("对象object设置为null，GC回收之后，弱引用：" + testWeakReference.get());
    }
}

运行结果：
GC回收之前， 弱引用： java.lang.Object@ 7 b23ec81
GC回收之后， 弱引用： java.lang.Object@ 7 b23ec81
对象object设置为null， GC回收之后， 弱引用： nullCOPY
```

### 3、ThreadLocal内存泄漏的demo

给大家来看下一个内存泄漏的例子，其实就是用线程池，一直往里面放对象：

```java
public class ThreadLocalTestDemo {
    private static ThreadLocal<MyClass> threadLocal = new ThreadLocal<>();

    public static void main(String[] args) throws InterruptedException {
        ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(5, 5, 1, TimeUnit.MINUTES, new LinkedBlockingQueue<>());

        for (int i = 0; i < 10; ++i) {
            threadPoolExecutor.execute(new Runnable() {
                @Override
                public void run() {
                    System.out.println("创建对象：");
                    MyClass myClass = new MyClass();
                    threadLocal.set(myClass);
                    myClass = null; //将对象设置为 null，表示此对象不在使用了
                   // threadLocal.remove();
                }
            });
            Thread.sleep(1000);
        }
    }

    static class MyClass {
        // 100M
        private byte[] bytes = new byte[100 * 1024 * 1024];
    }
}

创建对象：
创建对象：
创建对象：
创建对象：
Exception in thread "pool-1-thread-4" java.lang.OutOfMemoryError: Java heap space
 at com.example.dto.ThreadLocalTestDemo$MyClass.<init>(ThreadLocalTestDemo.java:33)
 at com.example.dto.ThreadLocalTestDemo$1.run(ThreadLocalTestDemo.java:21)
 at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
 at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
 at java.lang.Thread.run(Thread.java:748)COPY
```

运行结果出现了OOM，threadLocal.remove();加上后，则不会OOM

我们这里没有手动设置threadLocal变量为null，但是还是会内存泄漏。因为我们使用了线程池，线程池有很长的生命周期，因此线程池会一直持有MyClass对象的value值，即使设置myClass = null;引用还是存在的。这就好像，你把一个个对象object放到一个list列表里，然后再单独把object设置为null的道理是一样的，列表的对象还是存在的。

```java
public static void main(String[] args) {
        List < Object > list = new ArrayList < > ();
        Object object = new Object();
        list.add(object);
        object = null;
        System.out.println(list.size());
    }
}

//运行结果
1COPY
```

以上就是Value的内存泄露，具体分析如下：

- 在ThreadLocalMap中的每个Entry都是一个对key的弱引用，同时，每个Entry都包含了一个对value的强引用。
- 正常情况，当线程终止，保存在ThreadLocal里的value会被垃圾回收，因为没有任何强引用了。
- 但是，如果线程不终止（比如线程池需要保持很久），那么key对应的value就不能被回收。(Thread -> ThreadLocalMap -> Entry(key为null) -> value)。
- 因为value和Thread之间还存在这个强引用链路，所以导致value无法回收，就可能出现OOM；JDK已经考虑到这个问题，所以在set，remove，rehash方法中会扫描key为null，会把value也设置为null，这样value对象就可以被回收了。
- 但是如果一个ThreadLocal不被使用，那么实际上set，remove，rehash方法也不会被调用，如果同时线程又不停止，那么调用链就一直存在，那么就导致了value的内存泄露。

所以内存泄漏就这样发生啦，最后内存是有限的，就抛出了OOM了。如果我们加上threadLocal.remove();，则不会内存泄漏。为什么呢？因为threadLocal.remove();会清除Entry，源码如下：

```java
private void remove(ThreadLocal <? > key) {
    Entry[] tab = table;
    int len = tab.length;
    int i = key.threadLocalHashCode & (len - 1);
    for(Entry e = tab[i]; e != null; e = tab[i = nextIndex(i, len)]) {
        if(e.get() == key) {
            //清除entry
            e.clear();
            expungeStaleEntry(i);
            return;
        }
    }
}COPY
```

有些小伙伴说，既然内存泄漏不一定是因为弱引用，那为什么需要设计为弱引用呢？我们来探讨下：

## 六、Entry的Key为什么要设计成弱引用呢？

通过源码，我们是可以看到Entry的Key是设计为弱引用的(ThreadLocalMap使用ThreadLocal的弱引用作为Key的)。为什么要设计为弱引用呢？
![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151014364.png)
我们先来回忆一下四种引用：

> 强引用：我们平时new了一个对象就是强引用，例如 Object obj = new Object();即使在内存不足的情况下，JVM宁愿抛出OutOfMemory错误也不会回收这种对象。
> 软引用：如果一个对象只具有软引用，则内存空间足够，垃圾回收器就不会回收它；如果内存空间不足了，就会回收这些对象的内存。
> 弱引用：具有弱引用的对象拥有更短暂的生命周期。如果一个对象只有弱引用存在了，则下次GC将会回收掉该对象（不管当前内存空间足够与否）。
> 虚引用：如果一个对象仅持有虚引用，那么它就和没有任何引用一样，在任何时候都可能被垃圾回收器回收。虚引用主要用来跟踪对象被垃圾回收器回收的活动。

我们先来看看官方文档，为什么要设计为弱引用：

> To help deal with very large and long-lived usages, the hash table entries use WeakReferences for keys.
> 为了应对非常大和长时间的用途，哈希表使用弱引用的 key。

我再把ThreadLocal的引用示意图搬过来：
![file](https://blog.leke.cn/wp-content/uploads/2022/08/image-1659761347328.png)

下面我们分情况讨论：

- 如果Key使用强引用：当ThreadLocal的对象被回收了，但是ThreadLocalMap还持有ThreadLocal的强引用的话，如果没有手动删除，ThreadLocal就不会被回收，会出现Entry的内存泄漏问题。
- 如果Key使用弱引用：当ThreadLocal的对象被回收了，因为ThreadLocalMap持有ThreadLocal的弱引用，即使没有手动删除，ThreadLocal也会被回收。value则在下一次ThreadLocalMap调用set,get，remove的时候会被清除。

因此可以发现，由于ThreadLocalMap的生命周期跟Thread一样长，如果都没有手动删除对应的key，都会导致内存泄露。但是使用弱引用作为Entry的Key，可以多一层保障：弱引用ThreadLocal不会轻易内存泄漏，对应的value在下一次ThreadLocalMap调用set,get,remove的时候会被清除。

实际上，我们的内存泄漏的根本原因是，不再被使用的Entry，没有从线程的ThreadLocalMap中删除。一般删除不再使用的Entry有这两种方式：

- 一种就是，使用完ThreadLocal，手动调用remove()，把Entry从ThreadLocalMap中删除
- 另外一种方式就是：ThreadLocalMap的自动清除机制去清除过期Entry。（ThreadLocalMap的get(),set()时都会触发对过期Entry的清除）

## 七、InheritableThreadLocal保证父子线程间的共享数据

我们知道ThreadLocal是线程隔离的，如果我们希望父子线程共享数据，如何做到呢？可以使用InheritableThreadLocal。先来看看demo：

```java
public class InheritableThreadLocalTest {
   public static void main(String[] args) {
       ThreadLocal<String> threadLocal = new ThreadLocal<>();
       InheritableThreadLocal<String> inheritableThreadLocal = new InheritableThreadLocal<>();

       threadLocal.set("这是threadLocal");
       inheritableThreadLocal.set("这是inheritableThreadLocal");

       Thread thread = new Thread(()->{
           System.out.println("ThreadLocal value: " + threadLocal.get());
           System.out.println("InheritableThreadLocal value: " + inheritableThreadLocal.get());
       });
       thread.start();

   }
}
//运行结果
ThreadLocal value: null
InheritableThreadLocal value: 这是inheritableThreadLocalCOPY
```

可以发现，在子线程中，是可以获取到父线程的 InheritableThreadLocal 类型变量的值，但是不能获取到 ThreadLocal 类型变量的值。

获取不到ThreadLocal 类型的值，很好理解，因为它是线程隔离的嘛。InheritableThreadLocal 是如何做到的呢？原理是什么呢？

在Thread类中，除了成员变量threadLocals之外，还有另一个成员变量：inheritableThreadLocals。它们两类型是一样的：

```java
public class Thread implements Runnable {
   ThreadLocalMap threadLocals = null;
   ThreadLocalMap inheritableThreadLocals = null;
 }
}COPY
```

Thread类的init方法中，有一段初始化设置：

```java
 private void init(ThreadGroup g, Runnable target, String name,
                      long stackSize, AccessControlContext acc,
                      boolean inheritThreadLocals) {

        ......
        if (inheritThreadLocals && parent.inheritableThreadLocals != null)
            this.inheritableThreadLocals =
                ThreadLocal.createInheritedMap(parent.inheritableThreadLocals);
        /* Stash the specified stack size in case the VM cares */
        this.stackSize = stackSize;

        /* Set thread ID */
        tid = nextThreadID();
    }
 static ThreadLocalMap createInheritedMap(ThreadLocalMap parentMap) {
        return new ThreadLocalMap(parentMap);
    }
}COPY
```

可以发现，当parent的inheritableThreadLocals不为null时，就会将parent的inheritableThreadLocals，赋值给前线程的inheritableThreadLocals。说白了，就是如果当前线程的inheritableThreadLocals不为null，就从父线程哪里拷贝过来一个过来，类似于另外一个ThreadLocal，数据从父线程那里来的。有兴趣的小伙伴们可以在去研究研究源码~

## 八、ThreadLocal的应用场景和使用注意点

ThreadLocal的很重要一个注意点，就是使用完，要手动调用remove()。

而ThreadLocal的应用场景主要有以下这几种：

- 使用日期工具类，当用到SimpleDateFormat，使用ThreadLocal保证线性安全
- 全局存储用户信息（用户信息存入ThreadLocal，那么当前线程在任何地方需要时，都可以使用）
- 保证同一个线程，获取的数据库连接Connection是同一个，使用ThreadLocal来解决线程安全的问题
- 使用MDC保存日志信息。

> ThreadLocal在Spring中的应用
>
> - DateTimeContextHolder
> - RequestContextHolder
> - Spring事务

## 九、扩展类：FastThreadLocal

- [FastThreadLocal实现原理分析](https://blog.csdn.net/mycs2012/article/details/90898128)
- [FastThreadLocal吞吐量居然是ThreadLocal的3倍！！！](https://juejin.cn/post/6844903878870171662)

## 参考链接：

### [彻底理解ThreadLocal](https://www.cnblogs.com/xzwblog/p/7227509.html)

### [ThreadLocal是如何导致内存泄漏的](https://zhuanlan.zhihu.com/p/346291694)

### [深入分析 ThreadLocal 内存泄漏问题](https://www.jianshu.com/p/1342a879f523)
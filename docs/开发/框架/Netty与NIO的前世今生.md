---
title: Netty与NIO的前世今生
date: 2024-08-15 10:27:00
updated: 2024-08-15 10:27:00
categories: 
- 学习
tags: 
- Netty
keywords:
- Netty
description: Netty与NIO的前世今生
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212150339.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212151754.png
---
# 1.JavaNIO的三件套

在NIO有几个核心对象需要掌握：

- 缓冲区（Buffer）
- 选择器（selector）
- 通道（channel）

# 1.1 缓冲区Buffer

### 1. Buffer操作基本API

缓冲区实际是一个容器对象，更直接的说，其实就是一个数组，在NIO库中，所有数据都是都是用缓存区处理的。读取数据时，它是直接读取到缓冲区中；在写入数据时，它也是直接写到缓冲区中；任何是访问NIO中的数据，都是将它放到缓冲区中。在面向流I/O系统中，所有数据都是直接写入或读取到Stream对象中。
在NIO中，所有缓冲区对象都是继承于抽象类Buffer，最常用的就是ByteBuffer，对于Java的基本类型，基本上都有一个具体Buffer类型与之对应，它们之间的继承关系如下图：

![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151001591.png)

下面是一个简单使用InBuffer的案例

```java
public class IntBufferDemo {
    public static void main(String[] args) {
        //分配新的int缓冲区，参数为缓冲区容量
        //新缓冲区的当前位置为零，其界限（限制位置）将为其容量。它将具有一个底层实现数组，其数组偏移量将为零
        IntBuffer buffer = IntBuffer.allocate(8);

        for (int i=0; i < buffer.capacity(); i++) {
            int j = 2 * (i+1);
            //将给定整数写入此缓冲区的当前位置，当前位置递增
            buffer.put(j);
        }
        //重设此缓冲区，将限制位置为当前位置，然后将当前位置设置为0
        buffer.flip();
        //查看在当前位置和限制位置之间是否有元素
        while (buffer.hasRemaining()) {
            //读取此缓冲区当前位置的整数，然后将当前位置递增
            int j = buffer.get();
            System.out.print(j + "  ");
        }

    }

}COPY
```

运行后可以看到

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151002262.png" alt="file" style="zoom:90%;float: left;" />

### 2.Buffer的基本原理

在谈到缓冲区时，我们说缓冲区对象本质上是一个数组，但它其实是一个特殊的数组，缓冲区对象内置了一些机制，能够跟踪和记录缓冲区的状态变化，如果我们使用get()方法从缓冲区获取数据或者使用put()方法把数据写入缓冲区，都会引起缓冲区状态的变化
在缓冲区中，最重要的属性有下面三个，它们一起合作完成对缓冲区内部装填的变化跟踪：

position: 指定下一个将要被写入或者读取的元素索引，它的值由get()/put()方法自动更新，在新创建一个Buffer对象时，position被初始化为0。

limit: 指定还要多少数据需要取出（从缓冲区写入通道时），或者还有多少空间可以放入数据（在从通道读入缓冲区时）。

capacity： 指定了可以存储在缓冲区中的最大数据容量，实际上，它指定了底层数组的大小，或者至少是指定了准许我们使用的底层数组的容量。

以上三个属性之间有一些相对大小的关系：0 <= position <= limit <= capacity。如果我们创建一个新的容量大小为10的ByteBuffer对象，在初始化的时候，position设置为0，limit和capacity被设置为10，在以后使用ByteBuffer对象过程中，capacity的值不会再发生变化，而其它两个将会随着使用而变化。

下面我们用代码来演示一遍，准备一个txt文档，存放的E盘，输入以下内容：
test
下面用一段代码来验证position,limit和capactiy这几个值的变化过程，代码如下：

```java
public class BufferDemo {
    public static void main(String[] args) throws Exception {
        //这里使用的是文件id处理
        FileInputStream fin = new FileInputStream("E://test.txt");
        //创建文件的操作管道
        FileChannel fc = fin.getChannel();
        //分配一个10个大小缓冲区，就是分配一个10个大小的byte数组
        ByteBuffer buffer = ByteBuffer.allocate(10);
        output("初始化", buffer);
        //先读取一下
        fc.read(buffer);
        output("调用read()", buffer);
        //准备操作之前，先锁定操作范围
        buffer.flip();
        output("调用flip()", buffer);
        //判断有没有可读数据
        while (buffer.remaining() > 0){
            byte b = buffer.get();
        }
        output("调用 get()", buffer);
        //可以理解为解锁
        buffer.clear();
        output("调用clear()", buffer);
        //最后把管道关闭
        fin.close();

    }

    private static void output(String step, ByteBuffer buffer) {
        System.out.println(step + ":");
        //容量，数组大小
        System.out.print("capacity: " + buffer.capacity() + ", " );
        //当前操作数据所在的位置，也可以叫游标
        System.out.print("position: " + buffer.position() + ", ");
        //锁定值， flip, 数据操作范围索引只能在position - limit之间
        System.out.println("limit: " + buffer.limit());
        System.out.println();
    }

}COPY
```

完成的输出结果为：
<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151002536.png" alt="file" style="zoom:80%;" />

运行的结果我们可以看到，下面对以上结果进行图解，四个属性分别如图所示

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151002496.png" alt="file" style="zoom:100%;float: left;" />

我们可以从通道中读取一些数据到缓冲区中，注意从通道读取数据，相当于往缓冲区中写入数据。如果读取4个自己的数据，则此时position的值为4，即下一个将要被写入的字节索引为4，而limit仍然是10，如下图所示：

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151002423.png" alt="file" style="zoom:100%;float: left;" />

下一步把读取的数据写入到输出通道中，相当于从缓冲区中读取数据，在此之前，必去调用flip()方法，该方法将会完成两件事情：
1.将limit设置为当前的position值
2.把position设置为0
由于position被设置为0，所以可以保证在下一步输出是读取到的是缓冲区中的第一个字节，而limit被设置为当前的position，可以保证读取的数据正好是之前写入到缓冲区中的数据， 如下图所示：

![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151002870.png)
现在调用get()方法从缓冲区中读取数据写入到输出通道，这会导致position的增加而limit保持不变，但position不会超过limit的值，所以在读取我们之前写入到缓冲区中的4个自己之后，position和limit的值都为4，如下图所示：
![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151002577.png)

在从缓冲区读取数据完毕后，limit的值仍然保持在我们调用flip()方法的值，调用clear()方法能够把所有的状态变化为初始化的值，如下图所示：
![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151002598.png)

### 3.缓冲区的分配

在前面的几个例子中，我们已经看过了，在创建一个缓冲区对象时，会调用静态方法allocate()来指定缓冲区的容量，其实调用allocate()相当于创建一个指定大小的数组，并把它包装为缓冲区对象。或者我们也可以直接将一个现有的的数组，包装为缓冲区对象，如下实例所示：

```java
/**
 * 手动分配缓冲区
 */
public class BufferWrap {

    public void myMethod(){
        //分配指定大小的缓冲区
        ByteBuffer buffer = ByteBuffer.allocate(10);
        //包装一个现有的数组
        byte array[] = new byte[10];
        ByteBuffer buffer1 = ByteBuffer.wrap(array);
    }
}COPY
```

### 4.缓冲区分片

在NIO中，除了可以分配或者包装一个缓冲区对象外，还可以根据现有的缓冲区对象创建一个子缓冲区，即在现有缓冲区上切出一片作为一个新的缓冲区，但现有的缓冲区与创建的子缓冲区在底层数组层面上是数据共享的，也就是说，子缓冲区相当于是现有缓冲区的一个视图窗口。调用slice()方法可以创建一个子缓冲区，让我们通过例子看一下：

```java
public class BufferSlice {

    public static void main(String[] args) {
        ByteBuffer buffer = ByteBuffer.allocate(10);
        //缓冲区的数据 0-9
        for (int i=0; i < buffer.capacity(); i++){
            buffer.put((byte)(i));
        }

        //创建子缓冲区
        buffer.position(3);
        buffer.limit(7);
        ByteBuffer slice = buffer.slice();

        //改变子缓冲区的内容
        for (int i=0; i < slice.capacity(); i++){
            byte b = slice.get(i);
            b *= 10;
            slice.put(i, b);
        }

        buffer.position(0);
        buffer.limit(buffer.capacity());

        while (buffer.remaining() > 0){
            System.out.println(buffer.get());
        }

    }
}COPY
```

在该示例中，分配了一个容量大小为10的缓冲区，并在其中放入数据0-9，而在该缓冲区基础上又创建一个子缓冲区，并改变子缓冲区的内容，从最后输出的结果来看，只有子缓冲区“可见的”那部分数据发生了变化，并且说明子缓冲区与原缓冲区时数据共享的，输出结果如下所示：
![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151002993.png)

### 5.只读缓冲区

只读缓冲区非常简单，可以读取它们，但是不能向它们写入数据，可以通过调用缓冲区的asReadOnlyBuffer()方法，将任何常规缓冲区转换为只读缓冲区，这个方法返回一个与原缓冲区完全相同的缓冲区，并与原缓存取共享数据，只不过它是只读的，如果原缓冲区的内容发生了变化，只读缓冲区的内容也随之变化：

```java
public class ReadOnlyBuffer {

    public static void main(String[] args) {
        ByteBuffer buffer = ByteBuffer.allocate(10);

        //缓冲区的数据 0-9
        for (int i=0; i< buffer.capacity(); i++){
            buffer.put((byte)i);
        }

        //创建只读缓冲区
        ByteBuffer readOnly = buffer.asReadOnlyBuffer();

        //改变原缓冲区的内容
        for (int i=0; i< buffer.capacity(); i++){
            byte b = buffer.get(i);
            b *= 10;
            buffer.put(i, b);
        }

        readOnly.position(0);
        readOnly.limit(buffer.capacity());
        //只读缓冲区的内容也随之改变
        while (readOnly.remaining() > 0){
            System.out.println(readOnly.get());
        }
    }
}
COPY
```

如果尝试修改只读缓冲区的内容，则会报ReadOnlyBufferException异常。只读缓冲区对于保护数据很有用。在将缓冲区传递给某个对象方法时，无法知道这个方法是否会修改缓冲区中数据。创建一个只读的缓冲区可以保证该缓冲区不会被修改。只可以把常规缓冲区转换为只读缓冲区，而不能将只读的缓冲区转换为可写的缓冲区。

### 6.直接缓冲区

直接缓冲区是为加快I/O速度，使用一种特殊方式为其分配的内存的缓冲区，JDK文档中描述为：给定一个直接字节缓冲区，Java虚拟机将尽最大努力直接对它执行本机I/O操作。也就是说，它会在每一次调用底层操作系统的本机I/O操作之前（或之后），尝试避免将缓冲区的内容拷贝到一个中间缓冲区或者从一个中间缓冲区中拷贝内容。要分配直接缓冲区，需要调用allocateDirect()方法，而不是allocate()方法，使用方式与普通缓冲区并无区别，如下面的拷贝文件示例：

```java
public class DirectBuffer {
    public static void main(String[] args) throws Exception {
        //从磁盘上读取文件内容、
        String infile = "E://test.txt";
        FileInputStream fin = new FileInputStream(infile);
        FileChannel fcin = fin.getChannel();

        //把刚刚读取的内容写入到新的一个文件中
        String outfile = String.format("E://testcopy.txt");
        FileOutputStream fout = new FileOutputStream(outfile);
        FileChannel fcout = fout.getChannel();

        //使用allocateDirect ,而不是allocate
        ByteBuffer buffer = ByteBuffer.allocateDirect(1024);
        while (true){
            buffer.clear();
            int r = fcin.read(buffer);
            if (r == -1){
                break;
            }
            buffer.flip();
            fcout.write(buffer);
        }
    }
}
COPY
```

### 7.内存映射

内存映射是一种读和写文件数据的方法，它可以比常规的基于流或者基于通道的I/O快的多。内存映射文件I/O是通过使文件中的数据出现为内存数组的内容来完成的，这其初听起来似乎不过就是将整个文件读到内存中，但是事实上并不是这样。一般来说只有文件中实际读取或者写入的部分才会映射到内存中g.如下面的示例代码：

```java
public class MappedBuffer {

    private static  final  int start = 0;

    private static final int size = 1024;

    public static void main(String[] args) throws Exception {
        RandomAccessFile raf = new RandomAccessFile("E://test.txt", "rw");
        FileChannel fc = raf.getChannel();

        //把缓冲区跟文件系统进行一个映射关联
        //只要操作缓冲区里面的内容，文件内容也会跟着改变
        MappedByteBuffer mbb = fc.map(FileChannel.MapMode.READ_WRITE, start, size);
        mbb.put(0, (byte)97);
        mbb.put(1023, (byte)122);
        raf.close();
    }

}COPY
```

## 1.2选择器 Selector

传统的Server/Client模式基于TPR(Thread Request),服务器会为每个客户请求建立一个线程，由该线程单独负责处理一个客户请求。这种模式带来的一个问题就是线程数量的剧增，大量的线程会增大服务器的开销。大多数的实现为了避免这个问题，都采用了线程池模型，并设置线程池线程的最大数量，这又带来了新的问题，如果线程池中有200个线程，而有200个用户都在进行大文件下载，会导致第201用户的请求无法及时处理，即便第201个用户想请求一个几kb大小的页面，传统的Server/Client模式如下图所示

![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151003919.png)

NIO 中非阻塞 I/O 采用了基于 Reactor 模式的工作方式，I/O 调用不会被阻塞，相反是注册感兴趣的特定 I/O 事件，如可读数据到
达，新的套接字连接等等，在发生特定事件时，系统再通知我们。NIO 中实现非阻塞 I/O 的核心对象就是 Selector，Selector 就是
注册各种 I/O 事件地方，而且当那些事件发生时，就是这个对象告诉我们所发生的事件，如下图所示：

![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151003130.png)

从图中可以看出，当有读或写等任何注册的事件发生时，可以从 Selector 中获得相应的 SelectionKey，同时从 SelectionKey 中可
以找到发生的事件和该事件所发生的具体的 SelectableChannel，以获得客户端发送过来的数据。
使用 NIO 中非阻塞 I/O 编写服务器处理程序，大体上可以分为下面三个步骤：

1. 向 Selector 对象注册感兴趣的事件。
2. 从 Selector 中获取感兴趣的事件。
3. 根据不同的事件进行相应的处理。
   接下来我们用一个简单的示例来说明整个过程。首先是向 Selector 对象注册感兴趣的事件：

![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151003608.png)

创建了 ServerSocketChannel 对象，并调用 configureBlocking()方法，配置为非阻塞模式，接下来的三行代码把该通道绑定到指定
端口，最后向 Selector 中注册事件，此处指定的是参数是 OP_ACCEPT，即指定我们想要监听 accept 事件，也就是新的连接发 生
时所产生的事件，对于 ServerSocketChannel 通道来说，我们唯一可以指定的参数就是 OP_ACCEPT。
从 Selector 中获取感兴趣的事件，即开始监听，进入内部循环：

![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151006724.png)

在非阻塞 I/O 中，内部循环模式基本都是遵循这种方式。首先调用 select()方法，该方法会阻塞，直到至少有一个事件发生，然后
再使用 selectedKeys()方法获取发生事件的 SelectionKey，再使用迭代器进行循环。
最后一步就是根据不同的事件，编写相应的处理代码：

![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151006234.png)

此处分别判断是接受请求、读数据还是写事件，分别作不同的处理。在 Java1.4 之前的 I/O 系统中，提供的都是面向流的 I/O
系统，系统一次一个字节地处理数据，一个输入流产生一个字节的数据，一个输出流消费一个字节的数据，面向流的
I/O 速度非常慢，而在 Java 1.4 中推出了 NIO，这是一个面向块的 I/O 系统，系统以块的方式处理处理，每一个操作在
一步中产生或者消费一个数据库，按块处理要比按字节处理数据快的多。

## 1.3 通道Channel
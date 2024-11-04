---
title: My Java Guide - 算法
date: 2024-10-15 00:23:00
updated: 2024-10-15 00:23:00
categories: 
- 学习
tags: 
- Java
- 算法
keywords:
- Java
- 算法
description: Java, all in one！
cover: /img/data-structures-and-algorithms-concept-icon.png
top_img: /img/Java-tutorials-by-GeeksForGeeks.png
---

# <div align="center">---------------线性表、栈---------------</div>

# 线性表

```java
class SqList {
    private final int MAXSIZE = 100;
    private int[] data = new int[MAXSIZE];
    private int length;
}

class ListNode {
    int val;
    ListNode next;
    ListNode prev;
}
```

## 反转数组

```java
public void reverseSqList(int[] arr) {
    int left = 0;
    int right = arr.length - 1;
    while (left < right) {
        swap(data[left], data[right]);  // 交换元素
        left++;
        right--;
    }
}
```

## 反转链表

反转一个单链表。

```java
public ListNode reverseLinkList(ListNode head) {
    ListNode prev = null; // 用于指向反转后的前一个节点
    ListNode curr = head; // 当前节点
    ListNode next; // 用于暂存当前节点的下一个节点

    while (curr != null) {
        next = curr.next; // 暂存当前节点的下一个节点
        curr.next = prev; // 将当前节点的 next 指向前一个节点
        prev = curr; // 移动 prev 指针
        curr = next; // 移动 curr 指针
    }
    return prev; // 返回反转后的头节点
}
```

## 合并两个数组

合并两个有序数组为一个有序数组。

```java
public void merge(int[] nums1, int m, int[] nums2, int n) {
    int i = m - 1, j = n - 1, k = m + n - 1;
    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k--] = nums1[i--];
        } else {
            nums1[k--] = nums2[j--];
        }
    }
    while (j >= 0) {
        nums1[k--] = nums2[j--];
    }
}
```

## 合并两个链表

```java
/**
 * 合并两个排序的链表。
 * @param l1 第一个链表
 * @param l2 第二个链表
 * @return 合并后的链表
 */
public static ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode current = dummy;

    while (l1 != null && l2 != null) {
        if (l1.val < l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }

    // 如果其中一个链表已经为空，将另一个链表的剩余部分直接连接到当前节点后面
    if (l1 != null) {
        current.next = l1;
    } else {
        current.next = l2;
    }

    return dummy.next;
}
```

## 拆分两个数组

```java
public static void splitArray(int[] inputArray) {
    List<Integer> oddNumbers = new ArrayList<>();
    List<Integer> evenNumbers = new ArrayList<>();

    for (int num : inputArray) {
        if (num % 2 == 0) {
            evenNumbers.add(num); // 偶数
        } else {
            oddNumbers.add(num);   // 奇数
        }
    }
    
    // 转换 List 为数组
    int[] oddArray = oddNumbers.stream().mapToInt(Integer::intValue).toArray();
    int[] evenArray = evenNumbers.stream().mapToInt(Integer::intValue).toArray();
}
```

## 拆分两个链表

```java
/**
 * 拆分链表，将奇数节点和偶数节点拆分成两个链表。
 * @param head 输入的链表头节点
 * @return 一个包含两个链表头节点的数组，第一个链表包含所有奇数节点，第二个链表包含所有偶数节点
 */
public static ListNode[] splitListToParts(ListNode head) {
    ListNode oddDummy = new ListNode(0);
    ListNode evenDummy = new ListNode(0);
    ListNode oddCurrent = oddDummy;
    ListNode evenCurrent = evenDummy;
    ListNode current = head;
    int index = 1; // 用于区分奇数和偶数节点

    while (current != null) {
        if (index % 2 == 1) { // 奇数位置
            oddCurrent.next = current;
            oddCurrent = oddCurrent.next;
        } else { // 偶数位置
            evenCurrent.next = current;
            evenCurrent = evenCurrent.next;
        }
        current = current.next;
        index++;
    }

    // 设置链表结尾
    oddCurrent.next = null;
    evenCurrent.next = null;

    return new ListNode[]{oddDummy.next, evenDummy.next};
}
```

## TopK

```java
// 最小堆法
public static int[] findTopKElements(int[] data, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>(k); // 创建一个小顶堆，大小为 k
    // 遍历数据流
    for (int num : data) {
        if (minHeap.size() < k) {
            // 如果堆的大小还没有达到 k，直接加入元素
            minHeap.offer(num);
        } else {
            // 如果当前元素大于堆顶元素，则替换堆顶元素
            if (num > minHeap.peek()) {
                minHeap.poll(); // 移除堆顶元素
                minHeap.offer(num); // 加入当前元素
            }
        }
    }
    // 将堆转换为数组
    int[] result = new int[k];
    int index = 0;
    while (index < k) result[index++] = minHeap.poll();
    return result;
}

// 暴力排序法
public static int[] findTopK(int[] nums, int k) {
    // 升序排列
    Arrays.sort(nums);
    int[] result = new int[k];
    // 取最后k个最大数
    System.arraycopy(nums, nums.length - k, result, 0, k);
    return result;
}
```

## 数组和列表之间的转换

```java
//数组转列表
//Arrays.asList()的数据会受影响
public static void testArray2List(){
    String[] strs = {"aaa","bbb","ccc"};
    List<String> list = Arrays.asList(strs);
    for (String s : list) {
        System.out.println(s);
    }
}
//列表转数组
//list.toArray()的数据不会受影响
public static void testList2Array(){
    List<String> list = new ArrayList<String>();
    list.add("aaa");
    list.add("bbb");
    list.add("ccc");
    String[] array = list.toArray(new String[list.size()]);
    //String[] array = list.toArray(new String[0]);
    for (String s : array) {
        System.out.println(s);
    }
}
```

# 栈、队列

## 用栈实现队列

```java
public class QueueWithTwoStacks {

    private Stack<Integer> stackA; // 用于入队
    private Stack<Integer> stackB; // 用于出队

    public 用两个栈实现队列_QueueWithTwoStacks() {
        stackA = new Stack<>();
        stackB = new Stack<>();
    }

    // 入队操作
    public void enqueue(int value) {
        stackA.push(value);  // 将元素压入 stackA
    }

    // 出队操作
    public int dequeue() {
        if (stackB.isEmpty()) {
            // 如果 stackB 为空，则将 stackA 中的元素依次弹出并压入 stackB
            while (!stackA.isEmpty()) {
                stackB.push(stackA.pop());
            }
        }
        // 返回并弹出 stackB 的顶部元素
        return stackB.pop();
    }

    // 判断队列是否为空
    public boolean isEmpty() {
        return stackA.isEmpty() && stackB.isEmpty();
    }

    // 获取队列的大小
    public int size() {
        return stackA.size() + stackB.size();
    }

    public static void main(String[] args) {
        QueueWithTwoStacks queue = new QueueWithTwoStacks();
        System.out.println(queue.isEmpty()); // 输出 true
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        System.out.println(queue.dequeue()); // 输出 1
        System.out.println(queue.dequeue()); // 输出 2
        queue.enqueue(4);
        System.out.println(queue.dequeue()); // 输出 3
        queue.enqueue(5);
        queue.enqueue(6);
        System.out.println(queue.size()); // 输出 3
        System.out.println(queue.isEmpty()); // 输出 false
    }
}
```

## 用数组实现循环队列

```java
public class CircularQueue {
    private int[] queue;
    private int front;
    private int rear;
    private int capacity;

    public CircularQueue(int capacity) {
        this.capacity = capacity;
        queue = new int[capacity];
        front = 0;
        rear = -1;
    }

    public boolean enqueue(int value) {
        if (isFull()) {
            return false;
        }
        rear = (rear + 1) % capacity;
        queue[rear] = value;
        return true;
    }

    public int dequeue() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue is empty.");
        }
        int value = queue[front];
        front = (front + 1) % capacity;
        return value;
    }

    public boolean isEmpty() {
        return front == 0 && rear == -1;
    }

    public boolean isFull() {
        return (rear + 1) % capacity == front;
    }
}
```

## [有效的括号](https://leetcode.cn/problems/valid-parentheses/)

判断字符串中的括号是否有效配对。例如`[]{()()}}`。

```java
public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();

    for(char ch : s.toCharArray()){
        if(ch == '(') stack.push(')');
        else if(ch == '[') stack.push(']');
        else if(ch == '{') stack.push('}');
        else if(stack.isEmpty() || stack.pop() != ch) return false;
    }
    return stack.isEmpty();
}
```

## 最小栈

设计一个可以获取最小元素的栈。

```java
class MinStack {
    private Stack<Integer> stack;
    private Stack<Integer> minStack;

    public MinStack() {
        stack = new Stack<>();
        minStack = new Stack<>();
    }

    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        }
    }

    public void pop() {
        if (stack.pop().equals(minStack.peek())) {
            minStack.pop();
        }
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}
```

# <div align="center">---------------------树---------------------</div>

# 二叉树

## 二叉树结构

```java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) {
        val = x;
    }
}
```

## 前序|中序|后序、层次遍历

实现二叉树的前序、中序、后序、层次遍历。

```java
// 前序遍历 （根-左-右）
private static void preOrder(BinaryNode<Integer> root) {
    if (root != null) {
        System.out.print(root.val + " ");
        preOrder(root.left);
        preOrder(root.right);
    }
}
```

```java
// 中序遍历 （左-根-右）
private static void inOrder(BinaryNode<Integer> root) {
    if (root != null) {
        inOrder(root.left);
        System.out.print(root.val + " ");
        inOrder(root.right);
    }
}
```

```java
// 后序遍历 （左-右-根）
private static void postOrder(BinaryNode<Integer> root) {
    if (root != null) {
        postOrder(root.left);
        postOrder(root.right);
        System.out.print(root.val + " ");
    }
}
```

```java
// 层次遍历
public static List<List<Integer>> levelOrder(BinaryNode<Integer> root) {
    // 层次遍历的结果集
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) {
        return result;
    }
    // 等待遍历的节点队列
    Queue<BinaryNode<Integer>> queue = new LinkedList<>();
    // 首次遍历的节点是根节点
    queue.add(root);
    // 一直遍历到所有节点的叶子节点
    while (!queue.isEmpty()) {
        // 当前层的遍历结果集
        List<Integer> level = new ArrayList<>();
        // 当前层的节点数量
        int size = queue.size();
        // 遍历当前层的所有节点
        for (int i = 0; i < size; i++) {
            BinaryNode<Integer> node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(level);
    }
    return result;
}
```

## 查找、插入、删除、更新

```java
// 查找
public static BinaryNode<Integer> search(BinaryNode<Integer> root, int key) {
    if (root == null || root.val == key) {
        return root;
    }

    if (key < root.val) {
        return search(root.left, key);
    } else {
        return search(root.right, key);
    }
}
```

```java
// 插入新节点
public static BinaryNode<Integer> insert(BinaryNode<Integer> root, int data) {
    if (root == null) {
        return new BinaryNode<>(data);
    }

    if (data <= root.val) {
        root.left = insert(root.left, data);
    } else {
        root.right = insert(root.right, data);
    }
    return root;
}
// 批量插入新节点
public static void insertBatch(BinaryNode<Integer> root, List<Integer> datas) {
    datas.forEach(data -> insert(root, data));
}

// 批量插入新节点
public static void insertBatch(BinaryNode<Integer> root, int[] datas) {
    insertBatch(root, Arrays.stream(datas).boxed().toList());
}
```

```java
// 删除节点
public static BinaryNode<Integer> delete(BinaryNode<Integer> root, int key) {
    if (root == null) {
        return null;
    }

    if (key < root.val) {
        root.left = delete(root.left, key);
    } else if (key > root.val) {
        root.right = delete(root.right, key);
    } else {
        // 找到了要删除的节点
        if (root.left == null) {
            // 如果没有左子节点或没有子节点，则返回右子节点
            return root.right;
        } else if (root.right == null) {
            // 如果没有右子节点，则返回左子节点
            return root.left;
        }

        // 如果有两个子节点，则找到右子树中的最小节点（即后继节点）
        root.val = searchMin(root.right).val;

        // 删除找到的后继节点
        root.right = delete(root.right, root.val);
    }

    return root;
}
// 查找子树中的最小值节点
private static BinaryNode<Integer> searchMin(BinaryNode<Integer> root) {
    while (root.left != null) {
        root = root.left;
    }
    return root;
}
```

```java
// 更新
public static BinaryNode<Integer> update(BinaryNode<Integer> root, Integer key, Integer val) {
    if (root == null) {
        return null;
    }

    if (key < root.val) {
        root.left = update(root.left, key, val); // 如果 key 小于当前节点的值，则递归左子树
    } else if (key > root.val) {
        root.right = update(root.right, key, val); // 如果 key 大于当前节点的值，则递归右子树
    } else {
        // 找到了要更新的节点
        root.val = val; // 更新节点的值
    }

    return root;
}
```

## 翻转二叉树

```java
//翻转二叉树
public static BinaryNode<Integer> invertTree(BinaryNode<Integer> root) {
    if (root == null) {
        return null;
    }

    // 交换左右子树
    BinaryNode<Integer> temp = root.left;
    root.left = invertTree(root.right);
    root.right = invertTree(temp);

    return root;
}
```

## 判断路径总和

判断二叉树中是否存在一条路径，其路径和等于给定的数值。

```java
public boolean hasPathSum(TreeNode root, int sum) {
    if (root == null) return false;
    if (root.left == null && root.right == null) return sum == root.val;
    return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);
}
```

## 判断镜像二叉树

判断一个二叉树是否是它的镜像。

```java
public boolean isSymmetric(TreeNode root) {
    if (root == null) return true;
    return isMirror(root.left, root.right);
}

private boolean isMirror(TreeNode t1, TreeNode t2) {
    if (t1 == null && t2 == null) return true;
    if (t1 == null || t2 == null) return false;
    return (t1.val == t2.val)
            && isMirror(t1.right, t2.left)
            && isMirror(t1.left, t2.right);
}
```

# 哈夫曼树

## 哈夫曼编码原理

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202409292235997.png" alt="image-20240929223529827" style="zoom: 50%;" />

## 哈夫曼树结构

```java
class HuffmanNode<T> extends BinaryNode<T> implements Comparable<HuffmanNode<T>> {
    public T val;
    public HuffmanNode<T> left;
    public HuffmanNode<T> right;
    public int frequency;

    public HuffmanNode(T val, int frequency) {
        super(val);
        this.val = val;  // 添加这一行
        this.frequency = frequency;
    }

    public HuffmanNode(HuffmanNode<T> left, HuffmanNode<T> right) {
        super(null, left, right);  // 将 val 设置为 null
        this.val = null;  // 合并节点不需要值
        this.frequency = left.frequency + right.frequency;
    }

    public HuffmanNode(T val, HuffmanNode<T> left, HuffmanNode<T> right) {
        super(val, left, right);
        this.val = val;
        this.left = left;
        this.right = right;
        this.frequency = left.frequency + right.frequency;
    }

    @Override
    public int compareTo(HuffmanNode<T> other) {
        return Integer.compare(this.frequency, other.frequency);
    }
}
```

## 构建哈夫曼树

```java
// 处理字符串
public static Map<Character, Integer> calculateFrequencies(String str) {
    Map<Character, Integer> frequencies = new HashMap<>();
    for (char ch : str.toCharArray()) {
        frequencies.put(ch, frequencies.getOrDefault(ch, 0) + 1);
    }
    return frequencies;
}
// 构建哈夫曼树
public static HuffmanNode<Character> buildHuffmanTree(Map<Character, Integer> frequencies) {
    PriorityQueue<HuffmanNode<Character>> priorityQueue = new PriorityQueue<>();
    
    for (Map.Entry<Character, Integer> entry : frequencies.entrySet()) {
        priorityQueue.offer(new HuffmanNode<>(entry.getKey(), entry.getValue()));
    }
    while (priorityQueue.size() > 1) {
        HuffmanNode<Character> left = priorityQueue.poll();
        HuffmanNode<Character> right = priorityQueue.poll();
        int mergedFrequency = left.frequency + right.frequency;

        HuffmanNode<Character> mergedNode = new HuffmanNode<>(null, mergedFrequency);
        mergedNode.left = left;
        mergedNode.right = right;

        priorityQueue.offer(mergedNode);
    }
    return priorityQueue.poll();
}
```

## 哈夫曼编码、解码

```java
// 编码
public static Map<Character, String> encode(
    HuffmanNode<Character> node, 
    String code, 
    Map<Character, String> codes
) {
    if (node != null) {
        if (node.val != null) {
            codes.put(node.val, code);
        } else {
            generateCodes(node.left, code + "0", codes);
            generateCodes(node.right, code + "1", codes);
        }
    }
    return codes;
}
```

```java
// 解码
public static String decode(HuffmanNode<Character> root, String encodedString) {
    StringBuilder decodedString = new StringBuilder();
    HuffmanNode<Character> currentNode = root;

    // 逐位读取编码：从编码字符串中逐位读取每个比特（0 或 1）。
    for (char bit : encodedString.toCharArray()) {
        // 如果读取到 0，就向左子树移动；如果读取到 1，就向右子树移动。
        currentNode = (bit == '0') ? currentNode.left : currentNode.right;

        if (currentNode.val != null) {
            // 找到叶子节点。
            // 当前节点是叶子节点时，表示找到了一个字符。
            // 将该字符记录下来，并重置当前节点回到树的根节点，继续读取下一个比特。
            decodedString.append(currentNode.val);
            currentNode = root; // 重置为根节点
        }
    }
    return decodedString.toString();
}
```

## 计算带权路径长度、压缩率

```java
public static int calculateWPL(HuffmanNode<Character> node, int depth) {
    if (node == null) {
        return 0;
    }
    if (node.val != null) {
        return node.frequency * depth;
    }
    return calculateWPL(node.left, depth + 1) + calculateWPL(node.right, depth + 1);
}
```

```java
public static int calculateOriginalSize(String str) {
    // 每个字符占用16位
    return str.length() * Character.SIZE;
}

public static int calculateEncodedSize(String encodedString) {
    // 编码后的字符串占用的位数
    return encodedString.length();
}

public static double calculateCompressionRate(int originalSize, int encodedSize) {
    // 压缩率计算公式
    return (1 - (double) encodedSize / originalSize) * 100;
}
```

# <div align="center">-------------排序、搜索算法-------------</div>

# 排序算法

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202409052221888.jpg" alt="PixPin_2024-05-04_13-16-42" style="zoom: 67%;" />

**交换算法**

```java
/**
 * 交换数组中两个元素
 * 
 * @param array 需要排序的数组
 * @param i     元素一的索引
 * @param j     元素二的索引
 */
private void swap(int[] array, int i, int j) {
    int temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
// 思考：能不能不用临时变量就交换两个数呢？
// 可以的
private void swap(int a, int b) {
    a = a + b; // a 现在变成了 a+b
    b = a - b; // b = (a+b) - b, b 变成了 a
    a = a - b; // a = (a+b) - a, a 变成了 b
}
```

## 插入类排序

```java
/**********************插入类排序**********************/
/*
    直接插入排序：最好O(n)，最坏O(n^2)，平均O(n^2)，空间复杂度：O(1)
    折半插入排序：最好O(nlog2n)，最坏O(n^2)，平均O(n^2)，空间复杂度：O(1)
*/
//直接插入排序：从前往后不断将之后的关键字倒着往前比较，插入到有序序列中
```

在插入排序时，使用二分查找找到插入的位置，从而减少比较次数（但仍然需要线性时间插入元素）。

```java
/**
 * 直接插入排序
 * @param R 待排序数组
 */
public static void InsertSort(int[] R) {
    int i, j, temp;
    for (i = 1; i < R.length; i++) {
        temp = R[i];  // 待排关键字
        for (j = i - 1; j >= 0; j--) {  //往前遍历
            if (temp < R[j]){
                R[j + 1] = R[j];
            } else{
                break;
            }
        }
        R[j + 1] = temp;
    }
}
```

## 选择类排序

```java
/**********************选择类排序**********************/
/*
    简单选择排序：O(n^2)，执行次数和初始序列没有关系，空间复杂度O(1)
    堆排序：最好/坏O(nlog2n)，空间复杂度：O(1)
*/
//简单选择排序（最简单粗暴的排序，就像一个人从石头堆中一颗一颗地挑石头）
```

在选择最小元素时，记录最小元素的索引，并在每次找到更小元素时更新索引。

```java
/**
 * 简单选择排序
 * @param R 待排序数组
 */
public static void SelectSort(int[] R) {
    int i, j, k, temp;
    for (i = 0; i < R.length; i++) {
        k = i;  //k为最小值的下标
        for (j = i + 1; j < R.length; j++) {  // 让R[k]与序列所有未排序关键字比较，得到最小值的下标
            if (R[j] < R[k]) {
                k = j;
            }
        }  //一次for j循环总能至少找到一个最小值
        swap(R, i, k);  //交换当前值的下标i和最小值的下标k
    }
}

```

```java
/**
 * 堆排序
 * @param arr 待排序数组
 */
public static void heapSort(int[] arr) {
    int n = arr.length;

    // 生成堆（重新排列数组）
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // 逐个从堆中提取元素
    for (int i = n - 1; i > 0; i--) {
        // Move current root to end
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        // 在缩减的堆上调用max heapify
        heapify(arr, i, 0);
    }
}

// 将以节点i为根的子树进行重排序，节点i是arr[]中的索引。
private static void heapify(int[] arr, int n, int i) {
    int largest = i; // 初始化根节点为最大值
    int left = 2 * i + 1; // 左子树
    int right = 2 * i + 2; // 右子树

    // 如果左子树大于根
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // 如果右子树大于根和最大值
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // 如果最大值不是根节点
    if (largest != i) {
        int swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;

        // 递归排受影响的子树
        heapify(arr, n, largest);
    }
}

// 堆的插入
public static void pushHeap(List<Integer> maxHeap, int insertElem) {
    int currentPos = maxHeap.size(); // 插入关键字的位置
    int parentPos = currentPos / 2; // 父节点的位置
    while (currentPos != 0) { // 插入元素开始上调
        if (insertElem > maxHeap.get(parentPos)) { // 如果插入元素比父节点大，就把父节点的值拿下来放在当前位置，插入元素的位置继续上调
            maxHeap.set(currentPos, maxHeap.get(parentPos)); // 把父节点的值拿来下给当前位置
            currentPos = parentPos; // 把当前的位置改为父节点的位置
            parentPos = currentPos / 2; // 更新过后的当前位置改变了，父节点的位置也相应改变
        } else {
            break;
        }
    }
    maxHeap.set(currentPos, insertElem);
}
```

## 交换类排序

```java
/**********************交换类排序**********************/
/*
    冒泡排序：最好O(n)，最坏O(n^2)，平均O(n^2)，空间复杂度O(1)
    快速排序：最好O(nlogn)，最坏O(n^2)，平均O(nlogn)，空间复杂度：O(logn)
        越无序效率越高，越有序效率越低，排序趟数和初始序列有关
*/
//冒泡排序：大的沉底，小的上升，每一轮必定可以将一个极大关键字沉底
//快速排序：先选择一个基准（哨兵值）然后分成两部分递归，如此往复
```

```java
/**
 * 冒泡排序
 * @param R 待排序数组
 */
public void bubbleSort(int[] R) {
    int n = R.length;
    boolean swapped;
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (R[j] > R[j + 1]) {
                swap(arr, j, j+1)
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}
```

```java
//快速排序：先选择一个基准（哨兵值）然后分成两部分递归，如此往复
public void QuickSort(int R[], int low, int high){
    int i = low, j = high, temp;
    if(low < high){
        temp = R[low]; //哨兵值。如果倒着比较，应设为第一个值；如果顺着比较，应设为最后一个值
        while(i < j){
			//先做j--的操作（这里可以先i后j吗？不行，会发生数据覆盖问题，哨兵值决定了操作顺序）
            while(i < j & &temp < R[j]) --j;//如果R[j]的值始终比哨兵值temp大的话，就不停地减减
            if(i < j){				  //直到遇到一个比temp小的R[j]，将R[j]的值赋给R[i]，i的位置前进一位
                R[i] = R[j];
                ++i;//上一个位置的i被R[j]用了，所以这里要i+1，从新的位置开始
            }
			//然后再做i++的操作
            while(i < j && temp > R[i]) ++i;//如果R[i]的值始终比哨兵值temp小的话，就不停地加加
            if(i < j){				  //直到遇到一个比temp大的R[i]，将R[i]的值赋给R[j]，j的位置减一位
                R[j] = R[i];
                --j;//上一个j的位置被R[i]用了，j必须-1，从新的位置开始
            }
        }//一轮结束后，哨兵值temp左边的无序序列都比它小，右边的无序序列比它大
        R[i] = temp;//把temp插入原来的R[i]位置，完成一轮排序，之后二分迭代继续排序
        QuickSort(R, low, i-1);
        QuickSort(R, i+1, high);
    }
}
```

```java
/**
 * 快速排序的主方法
 * @param R     需要排序的数组
 * @param low   当前排序部分的左边界
 * @param high  当前排序部分的右边界
 */
public void quickSort(int[] R, int low, int high) {
    if (low < high) {
        int pivotIndex = partition(R, low, high);
        quickSort(R, low, pivotIndex - 1);
        quickSort(R, pivotIndex + 1, high);
    }
}

/**
 * 将数组分区，并返回分区点的索引
 * @param arr   需要排序的数组
 * @param low   当前分区部分的左边界
 * @param high  当前分区部分的右边界
 * @return 分区点的索引
 */
private static int partition(int[] arr, int low, int high) {
    int pivot = arr[low];  // 选择第一个元素作为枢轴
    int i = low, j = high;
    while (i < j) {
        while (j > i && arr[j] >= pivot) {
            j--;
        }
        if (j > i) {
            arr[i] = arr[j];
            i++;
        }
        while (i < j && arr[i] <= pivot) {
            i++;
        }
        if (i < j) {
            arr[j] = arr[i];
            j--;
        }
    }
    arr[i] = pivot;
    return i;
}
```

## 归并类排序

```java
/**********************归并类排序**********************/
/*
    二路归并排序：最好/坏O(nlogn)，空间复杂度O(n)
*/
```

```java
/**
 * 主排序方法，递归地将数组分成两部分进行排序
 * @param array 需要排序的数组
 * @param left  当前排序部分的左边界
 * @param right 当前排序部分的右边界
 */
public void mergeSort(int[] array, int left, int right) {
    if (left < right) {
        int middle = (left + right) / 2;
        mergeSort(array, left, middle);
        mergeSort(array, middle + 1, right);
        merge(array, left, middle, right);
    }
}

/**
 * 合并两个已排序的子数组
 * @param array 需要排序的数组
 * @param left  当前合并部分的左边界
 * @param middle 中间分隔点
 * @param right 当前合并部分的右边界
 */
private void merge(int[] array, int left, int middle, int right) {
    int leftSize = middle - left + 1;
    int rightSize = right - middle;

    int[] leftArray = new int[leftSize];
    int[] rightArray = new int[rightSize];

    // 复制数据到临时数组
    System.arraycopy(array, left, leftArray, 0, leftSize);
    System.arraycopy(array, middle + 1, rightArray, 0, rightSize);

    int i = 0, j = 0, k = left;

    // 合并两个临时数组
    while (i < leftSize && j < rightSize) {
        array[k++] = (leftArray[i] <= rightArray[j]) ? leftArray[i++] : rightArray[j++];
    }

    // 复制剩余的元素
    while (i < leftSize) {
        array[k++] = leftArray[i++];
    }

    while (j < rightSize) {
        array[k++] = rightArray[j++];
    }
}
```

## 分布类排序

```java
/**********************分布类排序**********************/
/*
    基数排序：O(d*(n+r))，空间复杂度：O(r)
            d：最大关键字位数，n：关键字个数，r：队列个数（即排序趟数）
*/
```

```java
// 主函数，执行基数排序
public static void radixSort(int[] R) {
    // 找到数组中的最大数，确定最高位数
    int max = Arrays.stream(R).max().getAsInt();

    // 从个位数开始排序，直到最高位
    for (int exp = 1; max / exp > 0; exp *= 10) {
        countingSort(R, exp);
    }
}

// 基于当前位数的计数排序
private static void countingSort(int[] arr, int exp) {
    int n = arr.length;
    int[] output = new int[n]; // 输出数组
    int[] count = new int[10]; // 计数数组，基数范围为 0-9

    // 统计每个数位出现的次数
    for (int j : arr) {
        int index = (j / exp) % 10;
        count[index]++;
    }

    // 计算累计和，调整 count 数组，使其存储排序后数字的位置
    for (int i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // 从后往前遍历原数组，按照当前位数将元素放入正确位置
    for (int i = n - 1; i >= 0; i--) {
        int index = (arr[i] / exp) % 10;
        output[count[index] - 1] = arr[i];
        count[index]--;
    }

    // 将排序好的数组复制回原数组
    System.arraycopy(output, 0, arr, 0, n);
}
```

## 二分查找

 ```java
public static int binSearch(int[] arr, int low, int high, int item) {
    while (low <= high) {
        int mid = (low + high) / 2;
        if (item < arr[mid]) {
            high = mid - 1; // 说明待查找元素在前半部分
        } else if (item > arr[mid]) {
            low = mid + 1; // 说明待查找元素在后半部分
        } else {
            return mid; // arr[mid] == item
        }
    }
    return -1; // 没查找到，说明序列中没有待查找关键字
}
 ```

# 搜索算法

## 广度优先搜索、深度优先搜索

```java
public class 搜索算法_DFS_BFS {
    private int N;  // 节点数量
    private List<List<Integer>> adjList;

    public 搜索算法_DFS_BFS(int n) {
        N = n;
        adjList = new LinkedList<>();
        for (int i = 0; i < N; ++i)
            adjList.add(new LinkedList<>());
    }

    // 无向图
    public void addEdge(int v, int w) {
        adjList.get(v).add(w);
        adjList.get(w).add(v);
    }

    /**
     * 广度优先搜索
     * @param val 开始遍历的节点值
     */
    public void BFS(int val) {
        boolean[] visited = new boolean[N];
        LinkedList<Integer> queue = new LinkedList<>();
        // // 将当前节点标记为已访问
        visited[val] = true;
        queue.add(val);

        while (!queue.isEmpty()) {
            val = queue.poll();
            System.out.print(val + " ");
            // 获取当前节点的所有邻居节点
            List<Integer> neighbors = adjList.get(val);
            for (Integer n : neighbors) {
                if (!visited[n]) {
                    visited[n] = true;
                    queue.add(n);
                }
            }
        }
    }

    /**
     * 深度优先搜索
     * @param val 开始遍历的节点值
     */
    public void DFS(int val) {
        boolean[] visited = new boolean[N];
        DFSUtil(val, visited);
    }

    private void DFSUtil(int v, boolean[] visited) {
        // 将当前节点标记为已访问
        visited[v] = true;
        System.out.print(v + " ");

        List<Integer> neighbors = adjList.get(v);
        // 访问 节点v 的所有子节点及其相邻节点，实现深度遍历
        for (Integer w : neighbors) {
            if (!visited[w])
                DFSUtil(w, visited);
        }
    }

    public static void main(String[] args) {
        搜索算法_DFS_BFS g = new 搜索算法_DFS_BFS(14);  // 修改为足够大的节点数量

        g.addEdge(10, 11);
        g.addEdge(10, 12);
        g.addEdge(11, 12);
        g.addEdge(12, 10);
        g.addEdge(12, 13);
        g.addEdge(13, 13);

        System.out.print("深度优先搜索: ");
        g.DFS(13);
        System.out.print("\n广度优先搜索: ");
        g.BFS(11);
    }
}
```

# <div align="center">----------------数据淘汰算法----------------</div>

## LRU 算法（最近最少使用）

设计一个数据结构，实现最近最少使用缓存。

通过哈希表和双向链表实现。哈希表提供 O(1) 的查找时间，双向链表维护访问顺序。

```java
// 直接继承法，继承LinkedHashMap，只需要重写get和put、修改淘汰规则即可
class LRUCache<K, V> {
    private final int capacity;
    private final LinkedHashMap<K, V> cache;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new LinkedHashMap<K, V>(capacity, 0.75f, true) {
            protected boolean removeEldestEntry(Map.Entry<K,V> eldest) {
                return size() > LRUCache.this.capacity;
            }
        };
    }

    public V get(K key) {
        return cache.getOrDefault(key, null);
    }

    public void put(K key, V value) {
        cache.put(key, value);
    }

    public void remove(K key) {
        cache.remove(key);
    }

    public int size() {
        return cache.size();
    }
}

// 手动实现法，手动实现淘汰规则
class LRUCache<K, V> {
    
    private final int capacity;
    private final Map<K, V> map;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        map = new LinkedHashMap<>();
    }
    
    public void put(K key, V value) {
        if (map.containsKey(key)) {
            map.remove(key);
            map.put(key, value);
            return;
        }
        map.put(key, value);
        if (map.size() > capacity) {
            map.remove(map.entrySet().iterator().next().getKey());
        }
    }
    
    public V get(K key) {
        if (!map.containsKey(key)) {
            return null;
        }
        V value = map.remove(key);
        map.put(key, value);
        return value;
    }
}


class Test{
    public static void main(String[] args) {
        LRUCache map = new LRUCache(5);
        map.put(4, 44);
        map.put(1, 11);
        map.put(2, 22);
        map.put(3, 33);
        map.put(7, 77);
        map.put(5, 55);
        map.put(8, 88);
        map.put(6, 66);
        map.put(1, 111);
        map.put(6, 666);
        System.out.println(map);
		
        // 直接实例化法，实例化时重写淘汰规则
        Map<Integer, Integer> LRUmap = new LinkedHashMap<Integer, Integer>(10, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry eldest) {
                return size() > 10;
            }
        };
        
    }
}
```

## LFU 算法（频率最少使用）

设计一个数据结构，实现最不经常使用缓存。

LFU 缓存需要同时记录使用频率和访问时间，通过哈希表和最小堆实现。

```java
class LFUCache {
    private final int capacity;
    private final Map<Integer, Node> cache;
    private final TreeMap<Integer, LinkedList<Node>> freqMap;
    private int minFreq = 0;
    private static class Node {
        int key, value, freq;
        Node(int key, int value) {
            this.key = key;
            this.value = value;
            this.freq = 1;
        }
    }

    public LFUCache(int capacity) {
        if (capacity <= 0) {
            throw new IllegalArgumentException("Capacity must be positive.");
        }
        this.capacity = capacity;
        cache = new HashMap<>();
        freqMap = new TreeMap<>();
    }

    public int get(int key) {
        if (!cache.containsKey(key)) {
            return -1;
        }
        Node node = cache.get(key);
        updateFreq(node);
        return node.value;
    }

    public void put(int key, int value) {
        if (cache.containsKey(key)) {
            Node node = cache.get(key);
            node.value = value;
            updateFreq(node);
        } else {
            Node node = new Node(key, value);
            if (cache.size() >= capacity) {
                // 删除最不常用的数据
                LinkedList<Node> minList = freqMap.get(minFreq);
                Node removeNode = minList.pollFirst();
                cache.remove(removeNode.key);
                if (minList.isEmpty()) {
                    freqMap.remove(minFreq);
                }
            }
            cache.put(key, node);
            freqMap.computeIfAbsent(1, k -> new LinkedList<>()).addLast(node);
            node.freq = 1;
            minFreq = 1;
        }
    }

    private void updateFreq(Node node) {
        int oldFreq = node.freq;
        LinkedList<Node> oldList = freqMap.get(oldFreq);
        oldList.remove(node);
        if (oldList.isEmpty()) {
            freqMap.remove(oldFreq);
            if (minFreq == oldFreq) {
                minFreq = freqMap.firstKey();
            }
        }
        node.freq++;
        freqMap.computeIfAbsent(node.freq, k -> new LinkedList<>()).addLast(node);
    }
}
```

# <div align="center">----------------多线程并发题----------------</div>

## 多线程交替打印数字

两个线程交替打印数字，一个线程打印奇数，另一个线程打印偶数，直到100。

**使用synchronized实现**

```java
class PrintOddEven {
    private final Object lock = new Object();
    private int number = 1;

    public void printOdd() {
        synchronized (lock) {
            while (number < 100) {
                if (number % 2 == 0) {
                    try {
                        lock.wait();
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                } else {
                    System.out.println(Thread.currentThread().getName() + ": " + number);
                    number++;
                    lock.notify();
                }
            }
        }
    }

    public void printEven() {
        synchronized (lock) {
            while (number < 100) {
                if (number % 2 != 0) {
                    try {
                        lock.wait();
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                } else {
                    System.out.println(Thread.currentThread().getName() + ": " + number);
                    number++;
                    lock.notify();
                }
            }
        }
    }
    
    public static void main(String[] args) {
        PrintOddEven poe = new PrintOddEven();
        Thread t1 = new Thread(poe::printOdd, "Odd");
        Thread t2 = new Thread(poe::printEven, "Even");
        t1.start();
        t2.start();
    }
    
}
```

**使用ReentrantLock实现**

```java
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

class PrintOddEvenLock {
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition condition = lock.newCondition();
    private int number = 1;

    public void printOdd() {
        lock.lock();
        try {
            while (number < 100) {
                if (number % 2 == 0) {
                    condition.await();
                } else {
                    System.out.println(Thread.currentThread().getName() + ": " + number);
                    number++;
                    condition.signal();
                }
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } finally {
            lock.unlock();
        }
    }

    public void printEven() {
        lock.lock();
        try {
            while (number < 100) {
                if (number % 2 != 0) {
                    condition.await();
                } else {
                    System.out.println(Thread.currentThread().getName() + ": " + number);
                    number++;
                    condition.signal();
                }
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } finally {
            lock.unlock();
        }
    }

    public static void main(String[] args) {
        PrintOddEvenLock poe = new PrintOddEvenLock();
        Thread t1 = new Thread(poe::printOdd, "Odd");
        Thread t2 = new Thread(poe::printEven, "Even");
        t1.start();
        t2.start();
    }
}
```

**使用Semaphore实现**

```java
import java.util.concurrent.Semaphore;

class PrintOddEvenSemaphore {
    private final Semaphore oddSemaphore = new Semaphore(1);
    private final Semaphore evenSemaphore = new Semaphore(0);
    private int number = 1;

    public void printOdd() {
        try {
            while (number < 100) {
                oddSemaphore.acquire();
                System.out.println(Thread.currentThread().getName() + ": " + number);
                number++;
                evenSemaphore.release();
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    public void printEven() {
        try {
            while (number < 100) {
                evenSemaphore.acquire();
                System.out.println(Thread.currentThread().getName() + ": " + number);
                number++;
                oddSemaphore.release();
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    public static void main(String[] args) {
        PrintOddEvenSemaphore poe = new PrintOddEvenSemaphore();
        Thread t1 = new Thread(poe::printOdd, "Odd");
        Thread t2 = new Thread(poe::printEven, "Even");
        t1.start();
        t2.start();
    }
}
```

## 多线程按顺序打印ABC

三个线程按顺序打印ABC，重复10次。

```java
public class 线程交替打印字母_PrintABC {
    private static final Object object = new Object();

    private static final int rounds = 3;

    private static int runNum = 0;
    private static final int max = 3 * rounds;


    private static void printA() {

        synchronized (object) {
            while (runNum < max) {
                if (runNum % 3 == 0) {
                    System.out.println(Thread.currentThread().getName() + " " + runNum + ":A");
                    runNum++;
                    object.notifyAll();
                } else {
                    try {
                        object.wait();
                    } catch (Exception e) {
                        Thread.currentThread().interrupt();
                    }
                }
            }
        }
    }

    private static void printB() {

        synchronized (object) {
            while (runNum < max) {
                if (runNum % 3 == 1) {
                    System.out.println(Thread.currentThread().getName() + " " + runNum + ":B");
                    runNum++;
                    object.notifyAll();
                } else {
                    try {
                        object.wait();
                    } catch (Exception e) {
                        Thread.currentThread().interrupt();
                    }

                }
            }
        }
    }
    
    private static void printC() {

        synchronized (object) {
            while (runNum < max) {
                if (runNum % 3 == 2) {
                    System.out.println(Thread.currentThread().getName() + " " + runNum + ":C");
                    runNum++;
                    object.notifyAll();
                } else {

                    try {
                        object.wait();
                    } catch (Exception e) {
                        Thread.currentThread().interrupt();
                    }
                }
            }
        }
    }
    
    public static void main(String[] args) {
        Thread threadA = new Thread(线程交替打印字母_PrintABC::printA, "线程A");
        Thread threadB = new Thread(线程交替打印字母_PrintABC::printB, "线程B");
        Thread threadC = new Thread(线程交替打印字母_PrintABC::printC, "线程C");
        threadA.start();
        threadB.start();
        threadC.start();
    }
}
```

## 模拟死锁

```java
class DeadLockDemo2 {

    private static final Object objectA = new Object();
    private static final Object objectB = new Object();

    public static void main(String[] args) {
        Thread thread1 = new Thread(new MyTask(objectA, objectB), "Thread 1");
        Thread thread2 = new Thread(new MyTask(objectB, objectA), "Thread 2");

        thread1.start();
        thread2.start();
    }

    static class MyTask implements Runnable {
        private final Object firstResource;
        private final Object secondResource;
        public MyTask(Object objectA, Object objectB) {
            this.firstResource = objectA;
            this.secondResource = objectB;
        }
        @Override
        public void run() {
            System.out.println(Thread.currentThread().getName() + "获取第一个资源");
            synchronized (firstResource) {

                System.out.println(Thread.currentThread().getName() + "已获取第一个资源");
                
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }

                System.out.println(Thread.currentThread().getName() + "获取第二个资源");
                synchronized (secondResource) {
                    System.out.println(Thread.currentThread().getName() + "已获取第二个资源");
                }
            }
        }
    }
}
```

## 模拟消息队列

使用阻塞队列实现生产者消费者问题。

```java
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

class ProducerConsumer {
    private static final int CAPACITY = 10;
    private final BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(CAPACITY);

    public void produce() throws InterruptedException {
        int value = 0;
        while (true) {
            queue.put(value);
            System.out.println("Produced: " + value);
            value++;
        }
    }

    public void consume() throws InterruptedException {
        while (true) {
            int value = queue.take();
            System.out.println("Consumed: " + value);
        }
    }

    public static void main(String[] args) {
        ProducerConsumer pc = new ProducerConsumer();
        Thread producer = new Thread(() -> {
            try {
                pc.produce();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        Thread consumer = new Thread(() -> {
            try {
                pc.consume();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        producer.start();
        consumer.start();
    }
}
```

## 哲学家进餐问题

使用信号量解决哲学家进餐问题。

```java
class Philosopher implements Runnable {
    private final Semaphore leftChopstick;
    private final Semaphore rightChopstick;
    private final int philosopherNumber;

    public Philosopher(int philosopherNumber, Semaphore leftChopstick, Semaphore rightChopstick) {
        this.philosopherNumber = philosopherNumber;
        this.leftChopstick = leftChopstick;
        this.rightChopstick = rightChopstick;
    }

    @Override
    public void run() {
        try {
            while (true) {
                think();
                pickUpChopsticks();
                eat();
                putDownChopsticks();
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    private void think() throws InterruptedException {
        System.out.println("Philosopher " + philosopherNumber + " is thinking.");
        Thread.sleep((long) (Math.random() * 1000));
    }

    private void pickUpChopsticks() throws InterruptedException {
        leftChopstick.acquire();
        rightChopstick.acquire();
        System.out.println("Philosopher " + philosopherNumber + " picked up chopsticks.");
    }

    private void eat() throws InterruptedException {
        System.out.println("Philosopher " + philosopherNumber + " is eating.");
        Thread.sleep((long) (Math.random() * 1000));
    }

    private void putDownChopsticks() {
        leftChopstick.release();
        rightChopstick.release();
        System.out.println("Philosopher " + philosopherNumber + " put down chopsticks.");
    }
}

public class 哲学家进餐问题 extends Thread {

    public static void main(String[] args) throws InterruptedException {
        int numberOfPhilosophers = 5;
        Semaphore[] chopsticks = new Semaphore[numberOfPhilosophers];
        for (int i = 0; i < numberOfPhilosophers; i++) {
            chopsticks[i] = new Semaphore(1);
        }

        Thread[] philosophers = new Thread[numberOfPhilosophers];
        for (int i = 0; i < numberOfPhilosophers; i++) {
            Semaphore leftChopstick = chopsticks[i];
            Semaphore rightChopstick = chopsticks[(i + 1) % numberOfPhilosophers];
            philosophers[i] = new Thread(new Philosopher(i, leftChopstick, rightChopstick), "Philosopher " + i);
            philosophers[i].start();
        }

        // Wait for all philosophers to finish
        for (Thread philosopher : philosophers) {
            philosopher.join();
        }
    }
}
```

## 使用CyclicBarrier实现多线程任务

使用CyclicBarrier实现多个线程分段执行任务，每个线程打印自己的任务完成后，等待其他线程到达，然后继续下一段任务。

```java
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

class CyclicBarrierExample {
    private static final int THREAD_COUNT = 3;
    private static final CyclicBarrier barrier = new CyclicBarrier(THREAD_COUNT, () -> System.out.println("All threads completed a phase."));

    public static void main(String[] args) {
        for (int i = 0; i < THREAD_COUNT; i++) {
            new Thread(new Task(), "Thread-" + i).start();
        }
    }

    static class Task implements Runnable {
        @Override
        public void run() {
            try {
                for (int i = 1; i <= 3; i++) {
                    System.out.println(Thread.currentThread().getName() + " completed phase " + i);
                    barrier.await();
                }
            } catch (InterruptedException | BrokenBarrierException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
}
```

## 使用CountDownLatch实现任务协调

使用CountDownLatch等待多个线程完成任务后再继续主线程执行。

```java
import java.util.concurrent.CountDownLatch;

class CountDownLatchExample {
    private static final int THREAD_COUNT = 3;
    private static final CountDownLatch latch = new CountDownLatch(THREAD_COUNT);

    public static void main(String[] args) {
        for (int i = 0; i < THREAD_COUNT; i++) {
            new Thread(new Task(), "Thread-" + i).start();
        }

        try {
            latch.await();
            System.out.println("All threads have finished. Main thread continues.");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    static class Task implements Runnable {
        @Override
        public void run() {
            try {
                System.out.println(Thread.currentThread().getName() + " is working.");
                Thread.sleep((long) (Math.random() * 1000));
                System.out.println(Thread.currentThread().getName() + " has finished.");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            } finally {
                latch.countDown();
            }
        }
    }
}
```

## 使用Exchanger实现线程间数据交换

使用Exchanger实现两个线程交换数据。

```java
import java.util.concurrent.Exchanger;

class ExchangerExample {
    private static final Exchanger<String> exchanger = new Exchanger<>();

    public static void main(String[] args) {
        new Thread(() -> {
            try {
                String data = "Data from Thread A";
                System.out.println("Thread A is exchanging: " + data);
                String receivedData = exchanger.exchange(data);
                System.out.println("Thread A received: " + receivedData);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }, "Thread A").start();

        new Thread(() -> {
            try {
                String data = "Data from Thread B";
                System.out.println("Thread B is exchanging: " + data);
                String receivedData = exchanger.exchange(data);
                System.out.println("Thread B received: " + receivedData);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }, "Thread B").start();
    }
}
```

**拓展：实现和指定的线程交换数据**

```java
class ExchangerRegistry {
    private static final ConcurrentHashMap<String, Exchanger<String>> exchangers = new ConcurrentHashMap<>();

    public static Exchanger<String> getExchanger(String threadName, String targetThreadName) {
        String key = generateKey(threadName, targetThreadName);
        return exchangers.computeIfAbsent(key, k -> new Exchanger<>());
    }

    private static String generateKey(String threadName, String targetThreadName) {
        return threadName.compareTo(targetThreadName) < 0 ? threadName + "-" + targetThreadName : targetThreadName + "-" + threadName;
    }
}

class ExchangerExample {
    public static void main(String[] args) {
        Thread threadA = new Thread(() -> exchangeData("ThreadB", "Data-A"), "ThreadA");
        Thread threadB = new Thread(() -> exchangeData("ThreadA", "Data-B"), "ThreadB");
        Thread threadC = new Thread(() -> exchangeData("ThreadD", "Data-C"), "ThreadC");
        Thread threadD = new Thread(() -> exchangeData("ThreadC", "Data-D"), "ThreadD");

        threadA.start();
        threadB.start();
        threadC.start();
        threadD.start();
    }

    private static void exchangeData(String targetThreadName, String dataToSend) {
        String threadName = Thread.currentThread().getName();
        Exchanger<String> exchanger = ExchangerRegistry.getExchanger(threadName, targetThreadName);

        try {
            System.out.println(threadName + " is exchanging: " + dataToSend);
            String receivedData = exchanger.exchange(dataToSend);
            System.out.println(threadName + " received: " + receivedData);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```

# <div align="center">------------------数学相关------------------</div>

## 两数之和

在数组中找到两个数，使它们的和等于给定的数。

```java
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    throw new IllegalArgumentException("No two sum solution");
}
```

## 两数之和 II

在一个排序列表中找到两个数，使它们的和等于给定的数。

```java
public int[] twoSum(int[] numbers, int target) {
    int left = 0, right = numbers.length - 1;
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) {
            return new int[] { left + 1, right + 1 };
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    throw new IllegalArgumentException("No two sum solution");
}
```

## 快乐数

判断一个数是否为快乐数，即反复将每个位的数字平方求和，最终会得到1。

```java
public boolean isHappy(int n) {
    Set<Integer> seenNumbers = new HashSet<>();
    while (n != 1 && !seenNumbers.contains(n)) {
        seenNumbers.add(n);
        n = getSumOfSquares(n);
    }
    return n == 1;
}
private int getSumOfSquares(int num) {
    int sum = 0;
    while (num > 0) {
        int digit = num % 10;
        sum += digit * digit;
        num /= 10;
    }
    return sum;
}
```

## 罗马数字转整数

将罗马数字转换为整数。

```java
public int romanToInt(String s) {
    Map<Character, Integer> roman = new HashMap<>();
    roman.put('I', 1);
    roman.put('V', 5);
    roman.put('X', 10);
    roman.put('L', 50);
    roman.put('C', 100);
    roman.put('D', 500);
    roman.put('M', 1000);
    
    int sum = 0;
    for (int i = 0; i < s.length(); i++) {
        int current = roman.get(s.charAt(i));
        int next = (i + 1 < s.length()) ? roman.get(s.charAt(i + 1)) : 0;
        if (current < next) {
            sum -= current;
        } else {
            sum += current;
        }
    }
    return sum;
}
```

## 整数反转

给你一个32位的有符号的`int`类型的数字，将数字上的每一位进行反转。

```java
public int reverseInt(int x) {
    int rev = 0;
    while (x != 0) {
        int pop = x % 10;
        x /= 10;
        rev = rev * 10 + pop;
    }
    return rev;
}
```

# <div align="center">--------------滑动窗口、动归--------------</div>

## 爬楼梯

```java
public int climbStairs(int n) {
    if (n <= 2) return n;
    int[] dp = new int[n + 1];
    dp[1] = 1;
    dp[2] = 2;
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
```

```java
public int lengthOfLIS(int[] nums) {
    if (nums == null || nums.length == 0) return 0;
    int[] dp = new int[nums.length];
    int len = 0;
    for (int num : nums) {
        int i = Arrays.binarySearch(dp, 0, len, num);
        if (i < 0) i = -(i + 1);
        dp[i] = num;
        if (i == len) len++;
    }
    return len;
}
```

## 能否组成顺子

```java
class Shunzi{
    public static boolean isShunzi(int[] places) {
        if (places == null || places.length == 0) {
            return false;
        }
        Arrays.sort(places);
        int zeroCount = 0;
        for (int num : places) {
            if (num == 0) {
                zeroCount++;
            }
        }
        // 计算前后相邻的数字相隔的大小，需要多少个个0去补
        int gapCount = 0;
        for (int i = zeroCount; i < places.length - 1; i++) {
            if (places[i] == places[i + 1]) {
                return false;  // 有重复的非零数字，不能成为顺子
            }
            gapCount += places[i + 1] - places[i] - 1;
        }
        return gapCount <= zeroCount;
    }

    public static void main(String[] args) {
        // 测试用例
        int[] test1 = {1, 2, 3, 4, 5}; // 顺子
        int[] test2 = {0, 2, 3, 4, 5}; // 顺子
        int[] test3 = {1, 0, 0, 4, 5}; // 顺子
        int[] test4 = {0, 0, 0, 0, 0}; // 顺子
        int[] test5 = {1, 2, 4, 5, 6}; // 不是顺子
        int[] test6 = {9, 10, 11, 12, 13}; // 是顺子
        int[] test7 = {0, 2, 4, 6, 7};  // 不是顺子

        System.out.println(isShunzi(test1)); // 输出 true
        System.out.println(isShunzi(test2)); // 输出 true
        System.out.println(isShunzi(test3)); // 输出 true
        System.out.println(isShunzi(test4)); // 输出 true
        System.out.println(isShunzi(test5)); // 输出 false
        System.out.println(isShunzi(test6)); // 输出 true
        System.out.println(isShunzi(test7)); // 输出 false
    }
}
```

## 最长公共前缀

找到字符串数组中的最长公共前缀。

```java
// 解法一：startsWith匹配
public static String getLongestPrefix(String[] strs) {
    if (strs == null || strs.length == 0) return "";

    String prefix = strs[0];
    
    for (String str : strs) {
        while (!str.startsWith(prefix)) {
            prefix = prefix.substring(0, prefix.length() - 1);
        }
    }
    return prefix;
}

// 解法二：indexOf匹配
public static String getLongestPrefix2(String[] strs) {
    if (strs.length == 0) return "";

    String prefix = strs[0];
    
    for (int i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) != 0) {
            prefix = prefix.substring(0, prefix.length() - 1);
            if (prefix.isEmpty()) return "";
        }
    }
    return prefix;
}
```

## 最长递增子串的长度

> 递增子串：每个**相邻**的数字之差为1，例如"1,2,3,4,5"

```java
public static int lengthOfCSQ(int[] nums) {
    if (nums == null || nums.length == 0)return 0;
    
    int max = 1, cur = 1;
    for (int i = 1; i < nums.length; i++) {
        if (nums[i] == nums[i - 1] + 1) {
            cur++;
        } else {
            max = Math.max(max, cur);
            cur = 1;
        }
    }
    max = Math.max(max, cur);
    
    return max;
}
```

## 最长递增子序列的长度

> 递增子序列：不考虑前后数字是否相邻，只要是递增的就行，例如"1,...,4,9,...,10,...,17"

```java
public int lengthOfNCSQ(int[] nums) {
    if (nums == null || nums.length == 0) return 0;

    int n = nums.length;
    int[] dp = new int[n];
    Arrays.fill(dp, 1);
    int max = 1;
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        max = Math.max(max, dp[i]);
    }

    return max;
}
```

## 最大子数组和

```java
class MaxSubArray{
    public static int maxSubArray(int[] nums) {
        for (int i = 1; i < nums.length; i++) {
            nums[i] = nums[i] + Math.max(0, nums[i - 1]);
        }
        System.out.println("动规结果：" + Arrays.toString(nums));
        return Arrays.stream(nums).max().getAsInt();
    }

    public static int maxSubArray2(int[] nums) {
        int pre = 0, res = nums[0];
        for (int num : nums) {
            pre = Math.max(pre + num, num);
            res = Math.max(pre, res);
        }
        return res;
    }

    public static void main(String[] args) {
        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println(maxSubArray2(nums));
    }
}
```

## 最大连续子数组和

```java
class MaxContinuousSubArray {
    public static int maxSubArray(int[] nums) {
        int cur = nums[0], max = nums[0];
        for (int i = 1; i < nums.length; i++) {
            cur = Math.max(nums[i], cur + nums[i]);
            max = Math.max(max, cur);
        }
        return max;
    }

    public static void main(String[] args) {
        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println(maxSubArray(nums)); // 输出: 6
    }
}
```

## 旋转数组

给定一个数组，将数组中的元素向右移动 k 个位置。

```java
public void rotate(int[] nums, int k) {
    k %= nums.length;
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, 0, nums.length - 1);
}

private void reverse(int[] nums, int start, int end) {
    while (start < end) {
        int temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
}
```

## 搜索旋转排序数组

在旋转排序数组中查找一个特定的元素。

```java
public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}
```

## 是否是回文数

判断一个整数是否是回文数，即正读和反读都一样。

```java
public boolean isPalindrome(int x) {
    if (x < 0 || (x % 10 == 0 && x != 0)) {
        return false;
    }
    int revertedNumber = 0;
    while (x > revertedNumber) {
        revertedNumber = revertedNumber * 10 + x % 10;
        x /= 10;
    }
    return x == revertedNumber || x == revertedNumber / 10;
}
```

## 回文串判断

```java
private static String getString(){
    StringBuilder sb = new StringBuilder();
    for (char c : str.toCharArray()) {
        if (Character.isLetterOrDigit(c)) {
            sb.append(Character.toLowerCase(c));
        }
    }
    retrun sb.toString();
}
public static boolean isPalindrome(String str) {
    
    // 去除空格和非字母数字字符，并转换为小写
    str = getString(str);
    
    // 使用双指针法进行比较
    int left = 0;
    int right = str.length() - 1;
    while (left < right) {
        if (str.charAt(left) != str.charAt(right)) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
```

## [最长回文子串]([5. 最长回文子串 - 力扣（LeetCode）](https://leetcode.cn/problems/longest-palindromic-substring/))

```java
public static String longestPalindrome(String s) {
    if (s == null || s.isEmpty()) return "";

    int start = 0, end = 0;
    for (int i = 0; i < s.length(); i++) {
        int len1 = expandAroundCenter(s, i, i);
        int len2 = expandAroundCenter(s, i, i + 1);

        int len = Math.max(len1, len2);

        // 截取回文子序列
        if (end - start < len) {
            start = i - (len - 1) / 2;
            end = i + len / 2;
        }
    }
    return s.substring(start, end + 1);
}

private static int expandAroundCenter(String s, int left, int right) {
    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
        left--;
        right++;
    }
    return right - left - 1;
}
```

## 最长回文子串的长度

```java
public static int longestPalindromeLength(String s) {
    if (s == null || s.isEmpty()) return 0;

    int max = 0;
    for (int i = 0; i < s.length(); i++) {
        int len1 = expandAroundCenter(s, i, i);
        int len2 = expandAroundCenter(s, i, i + 1);
        
        max = Math.max(max, Math.max(len1, len2));
    }
    return max;
}

private static int expandAroundCenter(String s, int left, int right) {
    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
        left--;
        right++;
    }
    return right - left - 1;
}
```

## *最长回文子序列的长度*

```java
public static int longestPalindromeSubseqLength(String s) {
    if (s == null || s.isEmpty()) return 0;

    int n = s.length();
    int[][] dp = new int[n][n];

    // 初始化对角线上的值
    for (int i = 0; i < n; i++) {
        dp[i][i] = 1;
    }

    // 填充 dp 数组
    for (int len = 2; len <= n; len++) { // 子序列长度
        for (int i = 0; i <= n - len; i++) { // 起始索引
            int j = i + len - 1; // 结束索引
            if (s.charAt(i) == s.charAt(j)) {
                dp[i][j] = dp[i + 1][j - 1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[0][n - 1];
}
```

## [无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)

**示例 1:**

```
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

**示例 2:**

```
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

**示例 3:**

```
输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

```java
public int lengthOfLongestSubstring(String s) {
    if (s.length() == 0 || s == null) return 0;

    Set<Character> set = new HashSet<>();
    int left = 0, right = 0;
    int max = 0;

    while (right < s.length()) {
        char ch = s.charAt(right);
        if (!set.contains(ch)) {
            set.add(ch);
            right++;
            max = Math.max(max, right - left);
        } else {
            set.remove(s.charAt(left));
            left++;
        }
    }
    return max;
}
```

## [寻找两个正序数组的中位数（暴力版）](https://leetcode.cn/problems/median-of-two-sorted-arrays/)

```java
public double findMedianSortedArrays(int[] nums1, int[] nums2) {
    
    int[] arr = IntStream.concat(Arrays.stream(nums1), Arrays.stream(nums2)).toArray();
    
    Arrays.sort(arr);
    
    if (arr.length % 2 == 0){
        return (double) (arr[arr.length / 2] + arr[arr.length / 2 - 1]) / 2;
    } else {
        return arr[arr.length / 2];
    }
}
```






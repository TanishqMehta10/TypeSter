import { supabase } from '../lib/supabase';

interface SnippetData {
  language: string;
  category: string;
  topic: string | null;
  code: string;
  difficulty: string;
  estimated_time: number;
  title: string;
}

const codeSnippets: SnippetData[] = [
  {
    language: 'python',
    category: 'random',
    topic: null,
    code: `def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,
    difficulty: 'easy',
    estimated_time: 30,
    title: 'Simple Greeting Function'
  },
  {
    language: 'python',
    category: 'random',
    topic: null,
    code: `class Calculator:
    def add(self, a, b):
        return a + b

    def subtract(self, a, b):
        return a - b

calc = Calculator()
result = calc.add(10, 5)`,
    difficulty: 'easy',
    estimated_time: 60,
    title: 'Basic Calculator Class'
  },
  {
    language: 'python',
    category: 'dsa',
    topic: 'arrays',
    code: `def find_max(arr):
    if not arr:
        return None
    max_val = arr[0]
    for num in arr:
        if num > max_val:
            max_val = num
    return max_val`,
    difficulty: 'easy',
    estimated_time: 60,
    title: 'Find Maximum in Array'
  },
  {
    language: 'python',
    category: 'dsa',
    topic: 'arrays',
    code: `def reverse_array(arr):
    left = 0
    right = len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr`,
    difficulty: 'easy',
    estimated_time: 60,
    title: 'Reverse Array In-Place'
  },
  {
    language: 'python',
    category: 'dsa',
    topic: 'strings',
    code: `def is_palindrome(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]

result = is_palindrome("A man a plan a canal Panama")`,
    difficulty: 'easy',
    estimated_time: 60,
    title: 'Check Palindrome String'
  },
  {
    language: 'python',
    category: 'dsa',
    topic: 'linked_lists',
    code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        if not self.head:
            self.head = Node(data)
            return
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = Node(data)`,
    difficulty: 'medium',
    estimated_time: 120,
    title: 'Basic Linked List Implementation'
  },
  {
    language: 'python',
    category: 'dsa',
    topic: 'stacks',
    code: `class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()

    def is_empty(self):
        return len(self.items) == 0`,
    difficulty: 'easy',
    estimated_time: 60,
    title: 'Stack Implementation'
  },
  {
    language: 'python',
    category: 'dsa',
    topic: 'two_pointers',
    code: `def two_sum_sorted(arr, target):
    left = 0
    right = len(arr) - 1
    while left < right:
        curr_sum = arr[left] + arr[right]
        if curr_sum == target:
            return [left, right]
        elif curr_sum < target:
            left += 1
        else:
            right -= 1
    return []`,
    difficulty: 'medium',
    estimated_time: 90,
    title: 'Two Sum in Sorted Array'
  },
  {
    language: 'java',
    category: 'random',
    topic: null,
    code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    difficulty: 'easy',
    estimated_time: 30,
    title: 'Hello World Program'
  },
  {
    language: 'java',
    category: 'dsa',
    topic: 'arrays',
    code: `public class ArraySum {
    public static int sumArray(int[] arr) {
        int sum = 0;
        for (int num : arr) {
            sum += num;
        }
        return sum;
    }
}`,
    difficulty: 'easy',
    estimated_time: 60,
    title: 'Sum of Array Elements'
  },
  {
    language: 'java',
    category: 'dsa',
    topic: 'sorting',
    code: `public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}`,
    difficulty: 'medium',
    estimated_time: 120,
    title: 'Bubble Sort Algorithm'
  },
        // --- existing manual entries continue above ---

// Generate DSA entries for each language/topic/difficulty
// (moved after the array close to avoid syntax errors)
    {
        language: 'cpp',
    category: 'random',
    topic: null,
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    difficulty: 'easy',
    estimated_time: 30,
    title: 'Hello World Program'
  },
  {
    language: 'cpp',
    category: 'dsa',
    topic: 'arrays',
    code: `#include <vector>
using namespace std;

int findMax(vector<int>& arr) {
    int maxVal = arr[0];
    for (int num : arr) {
        if (num > maxVal) {
            maxVal = num;
        }
    }
    return maxVal;
}`,
    difficulty: 'easy',
    estimated_time: 60,
    title: 'Find Maximum in Vector'
  },
  {
    language: 'cpp',
    category: 'dsa',
    topic: 'recursion',
    code: `int factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

int main() {
    int result = factorial(5);
    return 0;
}`,
    difficulty: 'easy',
    estimated_time: 60,
    title: 'Factorial using Recursion'
  },
  {
    language: 'c',
    category: 'random',
    topic: null,
    code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
    difficulty: 'easy',
    estimated_time: 30,
    title: 'Hello World Program'
  },
  {
    language: 'c',
    category: 'dsa',
    topic: 'arrays',
    code: `#include <stdio.h>

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}`,
    difficulty: 'easy',
    estimated_time: 60,
    title: 'Print Array Elements'
  },
  {
    language: 'python',
    category: 'dsa',
    topic: 'searching',
    code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    difficulty: 'medium',
    estimated_time: 90,
    title: 'Binary Search Algorithm'
  },
    // --- LeetCode linked items preview for arrays (python) ---
    {
        language: 'python',
        category: 'dsa',
        topic: 'arrays',
        code: `# LeetCode: Two Sum
        # https://leetcode.com/problems/two-sum`,
        difficulty: 'easy',
        estimated_time: 60,
        title: 'Two Sum (LeetCode)'
    },
    {
        language: 'python',
        category: 'dsa',
        topic: 'arrays',
        code: `# LeetCode: Best Time to Buy and Sell Stock
        # https://leetcode.com/problems/best-time-to-buy-and-sell-stock`,
        difficulty: 'easy',
        estimated_time: 60,
        title: 'Best Time to Buy and Sell Stock (LeetCode)'
    },
    {
        language: 'python',
        category: 'dsa',
        topic: 'arrays',
        code: `# LeetCode: 3Sum
        # https://leetcode.com/problems/3sum`,
        difficulty: 'medium',
        estimated_time: 120,
        title: '3Sum (LeetCode)'
    },
    {
        language: 'python',
        category: 'dsa',
        topic: 'arrays',
        code: `# LeetCode: Container With Most Water
        # https://leetcode.com/problems/container-with-most-water`,
        difficulty: 'medium',
        estimated_time: 120,
        title: 'Container With Most Water (LeetCode)'
    },
    {
        language: 'python',
        category: 'dsa',
        topic: 'arrays',
        code: `# LeetCode: Trapping Rain Water
        # https://leetcode.com/problems/trapping-rain-water`,
        difficulty: 'hard',
        estimated_time: 240,
        title: 'Trapping Rain Water (LeetCode)'
    },
    {
        language: 'python',
        category: 'dsa',
        topic: 'arrays',
        code: `# LeetCode: Merge k Sorted Lists
        # https://leetcode.com/problems/merge-k-sorted-lists`,
        difficulty: 'hard',
        estimated_time: 240,
        title: 'Merge k Sorted Lists (LeetCode)'
    },
    // --- LeetCode linked items preview for strings (python) ---
    {
        language: 'python',
        category: 'dsa',
        topic: 'strings',
        code: `# LeetCode: Valid Anagram
        # https://leetcode.com/problems/valid-anagram`,
        difficulty: 'easy',
        estimated_time: 60,
        title: 'Valid Anagram (LeetCode)'
    },
    {
        language: 'python',
        category: 'dsa',
        topic: 'strings',
        code: `# LeetCode: Implement strStr()
        # https://leetcode.com/problems/implement-strstr`,
        difficulty: 'easy',
        estimated_time: 60,
        title: 'Implement strStr() (LeetCode)'
    },
    {
        language: 'python',
        category: 'dsa',
        topic: 'strings',
        code: `# LeetCode: Longest Substring Without Repeating Characters
        # https://leetcode.com/problems/longest-substring-without-repeating-characters`,
        difficulty: 'medium',
        estimated_time: 120,
        title: 'Longest Substring Without Repeating Characters (LeetCode)'
    },
    {
        language: 'python',
        category: 'dsa',
        topic: 'strings',
        code: `# LeetCode: Group Anagrams
        # https://leetcode.com/problems/group-anagrams`,
        difficulty: 'medium',
        estimated_time: 120,
        title: 'Group Anagrams (LeetCode)'
    },
    {
        language: 'python',
        category: 'dsa',
        topic: 'strings',
        code: `# LeetCode: Minimum Window Substring
        # https://leetcode.com/problems/minimum-window-substring`,
        difficulty: 'hard',
        estimated_time: 240,
        title: 'Minimum Window Substring (LeetCode)'
    },
    {
        language: 'python',
        category: 'dsa',
        topic: 'strings',
        code: `# LeetCode: Text Justification
        # https://leetcode.com/problems/text-justification`,
        difficulty: 'hard',
        estimated_time: 240,
        title: 'Text Justification (LeetCode)'
    },
  {
    language: 'python',
    category: 'dsa',
    topic: 'hashing',
    code: `def find_duplicates(arr):
    seen = set()
    duplicates = []
    for num in arr:
        if num in seen:
            duplicates.append(num)
        else:
            seen.add(num)
    return duplicates`,
    difficulty: 'easy',
    estimated_time: 60,
    title: 'Find Duplicates using Hash Set'
  },
  {
    language: 'python',
    category: 'dsa',
    topic: 'dynamic_programming',
    code: `def fibonacci(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]`,
    difficulty: 'medium',
    estimated_time: 90,
    title: 'Fibonacci with Dynamic Programming'
  },
  {
    language: 'python',
    category: 'dsa',
    topic: 'sliding_window',
    code: `def max_sum_subarray(arr, k):
    if len(arr) < k:
        return None
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, window_sum)
    return max_sum`,
    difficulty: 'medium',
    estimated_time: 90,
    title: 'Maximum Sum Subarray of Size K'
  },
  {
    language: 'java',
    category: 'dsa',
    topic: 'queues',
    code: `import java.util.LinkedList;
import java.util.Queue;

public class QueueExample {
    public static void main(String[] args) {
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(1);
        queue.offer(2);
        queue.offer(3);
        int front = queue.poll();
    }
}`,
    difficulty: 'easy',
    estimated_time: 90,
    title: 'Queue Basic Operations'
  },
  {
    language: 'cpp',
    category: 'dsa',
    topic: 'trees',
    code: `struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

int maxDepth(TreeNode* root) {
    if (!root) return 0;
    int left = maxDepth(root->left);
    int right = maxDepth(root->right);
    return 1 + max(left, right);
}`,
    difficulty: 'medium',
    estimated_time: 120,
    title: 'Binary Tree Max Depth'
  },
  {
    language: 'python',
    category: 'dsa',
    topic: 'graphs',
    code: `def bfs(graph, start):
    visited = set()
    queue = [start]
    visited.add(start)

    while queue:
        vertex = queue.pop(0)
        print(vertex, end=" ")

        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
    difficulty: 'medium',
    estimated_time: 120,
    title: 'Breadth-First Search'
  },
  {
    language: 'python',
    category: 'dsa',
    topic: 'bit_manipulation',
    code: `def count_set_bits(n):
    count = 0
    while n:
        count += n & 1
        n >>= 1
    return count

def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0`,
    difficulty: 'medium',
    estimated_time: 90,
    title: 'Bit Manipulation Operations'
  },
  {
    language: 'java',
    category: 'dsa',
    topic: 'heap',
    code: `import java.util.PriorityQueue;

public class HeapExample {
    public static int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int num : nums) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        return minHeap.peek();
    }
}`,
    difficulty: 'medium',
    estimated_time: 120,
    title: 'Kth Largest Element using Heap'
  },
  {
    language: 'python',
    category: 'dsa',
    topic: 'matrix',
    code: `def rotate_matrix(matrix):
    n = len(matrix)
    for i in range(n):
        for j in range(i, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    for i in range(n):
        matrix[i].reverse()

    return matrix`,
    difficulty: 'medium',
    estimated_time: 90,
    title: 'Rotate Matrix 90 Degrees'
  },
  {
    language: 'cpp',
    category: 'dsa',
    topic: 'trie',
    code: `struct TrieNode {
    TrieNode* children[26];
    bool isEndOfWord;
    TrieNode() : isEndOfWord(false) {
        for (int i = 0; i < 26; i++)
            children[i] = nullptr;
    }
};

void insert(TrieNode* root, string word) {
    TrieNode* curr = root;
    for (char c : word) {
        int index = c - 'a';
        if (!curr->children[index])
            curr->children[index] = new TrieNode();
        curr = curr->children[index];
    }
    curr->isEndOfWord = true;
}`,
    difficulty: 'hard',
    estimated_time: 150,
    title: 'Trie Insert Operation'
  },
  {
    language: 'python',
    category: 'dsa',
    topic: 'union_find',
    code: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return
        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1`,
    difficulty: 'hard',
    estimated_time: 150,
    title: 'Union-Find Data Structure'
  }
];

// Programmatic expansion: DSA topics across languages and Random code entries
const languages = ['c', 'cpp', 'java', 'python'];
const topics = [
    'arrays', 'strings', 'hashing', 'dynamic_programming', 'sliding_window',
    'queues', 'stacks', 'linked_list', 'trees', 'graphs', 'heap', 'trie',
    'union_find', 'bit_manipulation', 'matrix', 'sorting', 'recursion',
    'greedy', 'backtracking', 'two_pointers'
];

const difficultyBuckets: Record<string, number> = {
    easy: 45,
    medium: 120,
    hard: 240
};

const canonicalLeetCodes: Record<string, { easy: string; medium: string; hard: string }> = {
    arrays: {
        easy: "Two Sum|https://leetcode.com/problems/two-sum",
        medium: "3Sum|https://leetcode.com/problems/3sum",
        hard: "4Sum II|https://leetcode.com/problems/4sum-ii"
    },
    strings: {
        easy: "Valid Anagram|https://leetcode.com/problems/valid-anagram",
        medium: "Group Anagrams|https://leetcode.com/problems/group-anagrams",
        hard: "Minimum Window Substring|https://leetcode.com/problems/minimum-window-substring"
    },
    hashing: {
        easy: "Contains Duplicate|https://leetcode.com/problems/contains-duplicate",
        medium: "Top K Frequent Elements|https://leetcode.com/problems/top-k-frequent-elements",
        hard: "Substring with Concatenation|https://leetcode.com/problems/substring-with-concatenation-of-all-words"
    },
    dynamic_programming: {
        easy: "Climbing Stairs|https://leetcode.com/problems/climbing-stairs",
        medium: "Coin Change|https://leetcode.com/problems/coin-change",
        hard: "Edit Distance|https://leetcode.com/problems/edit-distance"
    },
    sliding_window: {
        easy: "Maximum Average Subarray I|https://leetcode.com/problems/maximum-average-subarray-i",
        medium: "Minimum Size Subarray Sum|https://leetcode.com/problems/minimum-size-subarray-sum",
        hard: "Substring with Concatenation of All Words|https://leetcode.com/problems/substring-with-concatenation-of-all-words"
    },
    queues: {
        easy: "Implement Queue using Stacks|https://leetcode.com/problems/implement-queue-using-stacks",
        medium: "Sliding Window Maximum|https://leetcode.com/problems/sliding-window-maximum",
        hard: "Design Hit Counter|https://leetcode.com/problems/design-hit-counter"
    },
    stacks: {
        easy: "Valid Parentheses|https://leetcode.com/problems/valid-parentheses",
        medium: "Next Greater Element II|https://leetcode.com/problems/next-greater-element-ii",
        hard: "Largest Rectangle in Histogram|https://leetcode.com/problems/largest-rectangle-in-histogram"
    },
    linked_list: {
        easy: "Reverse Linked List|https://leetcode.com/problems/reverse-linked-list",
        medium: "Add Two Numbers|https://leetcode.com/problems/add-two-numbers",
        hard: "Merge k Sorted Lists|https://leetcode.com/problems/merge-k-sorted-lists"
    },
    trees: {
        easy: "Maximum Depth of Binary Tree|https://leetcode.com/problems/maximum-depth-of-binary-tree",
        medium: "Binary Tree Level Order Traversal|https://leetcode.com/problems/binary-tree-level-order-traversal",
        hard: "Serialize and Deserialize Binary Tree|https://leetcode.com/problems/serialize-and-deserialize-binary-tree"
    },
    graphs: {
        easy: "Number of Islands|https://leetcode.com/problems/number-of-islands",
        medium: "Course Schedule II|https://leetcode.com/problems/course-schedule-ii",
        hard: "Word Ladder II|https://leetcode.com/problems/word-ladder-ii"
    },
    heap: {
        easy: "Merge Two Sorted Lists (heap variant)|https://leetcode.com/problems/merge-two-sorted-lists",
        medium: "Kth Largest Element in an Array|https://leetcode.com/problems/kth-largest-element-in-an-array",
        hard: "Sliding Window Median|https://leetcode.com/problems/sliding-window-median"
    },
    trie: {
        easy: "Implement Trie (Prefix Tree)|https://leetcode.com/problems/implement-trie-prefix-tree",
        medium: "Add and Search Word - Data structure design|https://leetcode.com/problems/add-and-search-word-data-structure-design",
        hard: "Word Search II|https://leetcode.com/problems/word-search-ii"
    },
    union_find: {
        easy: "Friend Circles|https://leetcode.com/problems/friend-circles",
        medium: "Number of Connected Components in an Undirected Graph|https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph",
        hard: "Accounts Merge|https://leetcode.com/problems/accounts-merge"
    },
    bit_manipulation: {
        easy: "Single Number|https://leetcode.com/problems/single-number",
        medium: "Counting Bits|https://leetcode.com/problems/counting-bits",
        hard: "Maximum XOR of Two Numbers in an Array|https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array"
    },
    matrix: {
        easy: "Toeplitz Matrix|https://leetcode.com/problems/toeplitz-matrix",
        medium: "Spiral Matrix|https://leetcode.com/problems/spiral-matrix",
        hard: "Word Search II|https://leetcode.com/problems/word-search-ii"
    },
    sorting: {
        easy: "Sort Colors|https://leetcode.com/problems/sort-colors",
        medium: "Merge Intervals|https://leetcode.com/problems/merge-intervals",
        hard: "Sort Items by Groups Respecting Dependencies|https://leetcode.com/problems/sort-items-by-groups-respecting-dependencies"
    },
    recursion: {
        easy: "Pascals Triangle|https://leetcode.com/problems/pascals-triangle",
        medium: "Generate Parentheses|https://leetcode.com/problems/generate-parentheses",
        hard: "N-Queens|https://leetcode.com/problems/n-queens"
    },
    greedy: {
        easy: "Best Time to Buy and Sell Stock|https://leetcode.com/problems/best-time-to-buy-and-sell-stock",
        medium: "Jump Game II|https://leetcode.com/problems/jump-game-ii",
        hard: "Candy|https://leetcode.com/problems/candy"
    },
    backtracking: {
        easy: "Subsets|https://leetcode.com/problems/subsets",
        medium: "Combination Sum|https://leetcode.com/problems/combination-sum",
        hard: "Word Search II|https://leetcode.com/problems/word-search-ii"
    },
    two_pointers: {
        easy: "Reverse String|https://leetcode.com/problems/reverse-string",
        medium: "3Sum|https://leetcode.com/problems/3sum",
        hard: "Trapping Rain Water|https://leetcode.com/problems/trapping-rain-water"
    }
};

for (const lang of languages) {
    for (const topic of topics) {
        const pick = canonicalLeetCodes[topic];
        if (!pick) continue;

        const [easyTitle, easyUrl] = pick.easy.split('|');
        codeSnippets.push({
            language: lang === 'cpp' ? 'cpp' : lang === 'c' ? 'c' : lang,
            category: 'dsa',
            topic,
            code: `// LeetCode: ${easyTitle}\n// ${easyUrl}`,
            difficulty: 'easy',
            estimated_time: difficultyBuckets.easy,
            title: `${easyTitle} (LeetCode)`
        });

        const [medTitle, medUrl] = pick.medium.split('|');
        codeSnippets.push({
            language: lang === 'cpp' ? 'cpp' : lang === 'c' ? 'c' : lang,
            category: 'dsa',
            topic,
            code: `// LeetCode: ${medTitle}\n// ${medUrl}`,
            difficulty: 'medium',
            estimated_time: difficultyBuckets.medium,
            title: `${medTitle} (LeetCode)`
        });

        const [hardTitle, hardUrl] = pick.hard.split('|');
        codeSnippets.push({
            language: lang === 'cpp' ? 'cpp' : lang === 'c' ? 'c' : lang,
            category: 'dsa',
            topic,
            code: `// LeetCode: ${hardTitle}\n// ${hardUrl}`,
            difficulty: 'hard',
            estimated_time: difficultyBuckets.hard,
            title: `${hardTitle} (LeetCode)`
        });
    }

    // Random samples per language
    if (lang === 'python') {
        codeSnippets.push({ language: 'python', category: 'random', topic: null, code: `# Random Python: Fibonacci generator\ndef fib(n):\n    a,b=0,1\n    for _ in range(n):\n        yield a\n        a,b=b,a+b`, difficulty: 'easy', estimated_time: 30, title: 'Fibonacci Generator' });
        codeSnippets.push({ language: 'python', category: 'random', topic: null, code: `# Random Python: File line counter\nwith open('file.txt') as f:\n    print(sum(1 for _ in f))`, difficulty: 'easy', estimated_time: 30, title: 'File Line Counter' });
    }
    if (lang === 'java') {
        codeSnippets.push({ language: 'java', category: 'random', topic: null, code: `// Random Java: Read args\npublic class ArgsPrinter {\n  public static void main(String[] args) {\n    for (String a : args) System.out.println(a);\n  }\n}`, difficulty: 'easy', estimated_time: 30, title: 'Args Printer' });
    }
    if (lang === 'cpp') {
        codeSnippets.push({ language: 'cpp', category: 'random', topic: null, code: `// Random C++: Hello World\n#include <iostream>\nint main(){ std::cout<<"Hello from C++"<<std::endl; return 0; }`, difficulty: 'easy', estimated_time: 30, title: 'C++ Hello World' });
    }
    if (lang === 'c') {
        codeSnippets.push({ language: 'c', category: 'random', topic: null, code: `/* Random C: Hello World */\n#include <stdio.h>\nint main(){ printf("Hello from C\\n"); return 0; }`, difficulty: 'easy', estimated_time: 30, title: 'C Hello World' });
    }
}

export async function seedDatabase() {
  try {
    const { data: existing } = await supabase
      .from('code_snippets')
      .select('id')
      .limit(1);

    if (existing && existing.length > 0) {
      console.log('Database already seeded');
      return { success: true, message: 'Already seeded' };
    }

    const { error } = await supabase
      .from('code_snippets')
      .insert(codeSnippets);

    if (error) throw error;

    console.log('Database seeded successfully');
    return { success: true, message: 'Seeded successfully' };
  } catch (error) {
    console.error('Error seeding database:', error);
    return { success: false, error };
  }
}

---
layout: post
title:  "Apriori Algorithm"
author: Syen Park
date:   2018-10-01
categories: data_science
modified_date: 2019-09-11
---

### __1. Problem__

Suppose there are 35 candidate item sets of length 3:  
{1 2 4}, {1 2 9}, {1 3 5}, {1 3 9}, {1 4 7}, {1 5 8}, {1 6 7}, {1 7 9}, {1 8 9},  
{2 3 5}, {2 4 7}, {2 5 6}, {2 5 7}, {2 5 8}, {2 6 7}, {2 6 8}, {2 6 9}, {2 7 8},  
{3 4 5}, {3 4 7}, {3 5 7}, {3 5 8}, {3 6 8}, {3 7 9}, {3 8 9},   
{4 5 7}, {4 5 8}, {4 6 7}, {4 6 9}, {4 7 8},   
{5 6 7}, {5 7 9}, {5 8 9}, {6 7 8}, {6 7 9}   

Do write a program to generate a hash tree according to [Fast Algorithms for Mning Association](http://www.vldb.org/conf/1994/P487.PDF), Apriori algorithm, with max leaf size 2 and output the nested list (or nested dict) of the hash tree hierarchically.

For example, the nested list is  
![page2image19740896.png](/assets/181001-apriori-algorithm/181001-nested.png) 

and its corresponding hash tree is  
![page3image19792496.png](/assets/181001-apriori-algorithm/181001-hash_tree.png) 

### __2. Solution__



<span style="font-family: Courier New;"> [[[[1, 4, 7], [1, 7, 9], [4, 7, 8]], [[[1, 2, 4], [4, 5, 7]], [[1, 5, 8], [4, 5, 8]], [[1, 2, 9], [1, 8, 9]]], [[[1, 6, 7], [4, 6, 7]], [1, 3, 5], [[1, 3, 9], [4, 6, 9]]]], [[[2, 4, 7], [2, 7, 8], [5, 7, 9]], [[2, 5, 7], [2, 5, 8], [[2, 5, 6], [5, 8, 9]]], [[[2, 6, 7], [5, 6, 7]], [[2, 3, 5], [2, 6, 8]], [2, 6, 9]]], [[[3, 4, 7], [[3, 4, 5], [6, 7, 8]], [[3, 7, 9], [6, 7, 9]]], [[3, 5, 7], [3, 5, 8], [3, 8, 9]], [3, 6,8]]] </span>

### __3. Future Work__

- Make code simpler and concise.
- Add a function to draw a hash tree.
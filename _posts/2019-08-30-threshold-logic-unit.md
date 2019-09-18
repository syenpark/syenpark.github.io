---
layout: post
title:  "Threshold Logic Unit"
author: Syen Park
date:   2019-08-30
categories: artificial_intelligence
modified_date: 2019-09-18
---

### 1. Problem

<iframe src="https://drive.google.com/file/d/1esT5JTXloMBB9LpOxxBAf731cwwx9jJJ/preview" 
        width="100%" height="100%">
</iframe>

#### 1.1 Problem 3
I use [power set](https://en.wikipedia.org/wiki/Power_set) to find a minimal set of training instance that will train the OR Threshold Logic Unit (TLU)  correctly according to the error-correction procedure.

{% highlight python %}
import numpy as np

def f(X, W):
    """
    calculate X*W

    :param X: Training instances
    :param W: Weights
    :return: Boolean, what this one returns with X
    """
    return (np.matmul(X, W) >= 0).astype(int)

def desired_output(X):
    """
    or gate

    :param X: Training instances
    :return: What or gate should returns with X
    """
    d = []
    
    for x in X:
        d.append(x[1] or x[2])
    
    return d

def train(X, W, d, full_X):
    """
    Train by W <- W + X.T(d-f)
    Update W while given X can't produce desired output.
    If it can create desired output, check the desired output is the same with or gate's desired one or not.

    :param X: Training instances
    :param W: Weights
    :param d: Desired output
    :param full_X: Full training instances
    :return: Boolean shows or gate or not
    """
    print('Training instances: ', X)
    print('Initial weights', W)
    
    while not (f(X, W) == d).all():
        W = W + np.matmul(X.T, d - f(X, W))
    
        print('Weights are updated: ', W)
    else:
        if (f(full_X, W) == desired_output(full_X)).all():
            return True
        else:
            return False

def power_set(elements):
    """
    creates power set

    :param elements:
    :return: a power set
    """
    subsets = []
    n = len(elements)
    
    for i in range(1 << n):
        subset = []
    
        for j in range(n):
    
            if (i >> j) & 1:
                subset.append(elements[j])
    
        subsets.append(subset)
    
    return subsets

full_X = np.array([[1, 0, 0],
               [1, 0, 1],
               [1, 1, 0],
               [1, 1, 1]])

# except for the empty set, sort by the # of training instances
power_set_of_training_instances = sorted(power_set(full_X), key=(len))[1:]

for X in power_set_of_training_instances:
    X = np.array(X)
    W = np.array([0, 0, 0])
    d = desired_output(X)

    if train(X, W, d, full_X):
        print('I end up finding minimal instances to make OR gate!')
        print('Minimal training instances are', X)
    
        break
    else:
        print('This training instances cannot make OR gate. \n')
{% endhighlight %}

#### Problem 4

1. What's your fitness function?
2. What's your crossover operator?





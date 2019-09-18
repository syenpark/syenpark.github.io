---
layout: post
title:  "Threshold Logic Unit"
author: Syen Park
date:   2019-08-30
categories: artificial_intelligence
modified_date: 2019-09-18
---

### __1. Problem__

Do find *__a minimal set of training instance__* that will train *__the OR Threshold Logic Unit (TLU)__*  correctly according to *__the error-correction procedure__*.  
In other words, consider the problem of training a TLU to do logical disjunction
(logical “or”) using the error-correction procedure. Notice
that *__this operator takes two inputs__*, but to apply the procedure, you need to *__add one more
input whose value is always 1__*, and *__use 0 as the threshold__*. Suppose that we start with
the initial weights all equal to 0, and learning rate c = 1. Find a minimal set of training
instances that will correctly train the TLU according to the procedure. Here a training set
is minimal if removing any instance in it will not produce a TLU for the logical disjunction.
Please show the details of your work inlcuding the converging sequence of the weights.

### __2. Solution__
I use Numpy and [power set](https://en.wikipedia.org/wiki/Power_set) to find a minimal set of training instance that will train the OR TLU correctly according to the error-correction procedure.

#### __2.1 Create power set of training instances for OR TLU__

![OR gate.gif](/assets/190830-threshold-logic/190830-OR.gif){: .center-image}

According to the problem description, I should add one more input whose value is always 1 into two inputs. This one can be represented as like the following input matrix, `full_X`. The first column which contains only 1 to follow the description, and other following columns' combinations are maximum training set to train the OR gate considering the above OR gate's truth table. To be specific, second and third columns show A, B respectively.  
Using power set, I create all possible training instances to train the OR gate except for the empty set, which is in `power_set_of_training_instances`.

{% highlight python %}

full_X = np.array([[1, 0, 0],
                   [1, 0, 1],
                   [1, 1, 0],
                   [1, 1, 1]])

# except for the empty set, sort by the # of training instances
power_set_of_training_instances = sorted(power_set(full_X), key=(len))[1:]

{% endhighlight %}

<span style="font-family: Courier New;"> 
[[array([1, 0, 0])], <br/>
 [array([1, 0, 1])], <br/>
 [array([1, 1, 0])], <br/>
 [array([1, 1, 1])], <br/>
 [array([1, 0, 0]), array([1, 0, 1])], <br/>
 [array([1, 0, 0]), array([1, 1, 0])], <br/>
 [array([1, 0, 1]), array([1, 1, 0])], <br/>
 [array([1, 0, 0]), array([1, 1, 1])], <br/>
 [array([1, 0, 1]), array([1, 1, 1])], <br/>
 [array([1, 1, 0]), array([1, 1, 1])], <br/>
 [array([1, 0, 0]), array([1, 0, 1]), array([1, 1, 0])], <br/>
 [array([1, 0, 0]), array([1, 0, 1]), array([1, 1, 1])], <br/>
 [array([1, 0, 0]), array([1, 1, 0]), array([1, 1, 1])], <br/>
 [array([1, 0, 1]), array([1, 1, 0]), array([1, 1, 1])], <br/>
 [array([1, 0, 0]), array([1, 0, 1]), array([1, 1, 0]), array([1, 1, 1])]] 
</span>


{% highlight python %}

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





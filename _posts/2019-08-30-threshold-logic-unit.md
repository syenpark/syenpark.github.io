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
*__the initial weights all equal to 0__*, and *__learning rate c = 1__*. Find a minimal set of training
instances that will correctly train the TLU according to the procedure. Here a training set
is minimal if removing any instance in it will not produce a TLU for the logical disjunction.
Please show the details of your work inlcuding the converging sequence of the weights.

### __2. Solution__
I use Numpy and [power set](https://en.wikipedia.org/wiki/Power_set) to find a minimal set of training instance that will train the OR TLU correctly according to the error-correction procedure.

#### __2.1 Create power set of training instances for OR TLU__

![OR gate.gif](/assets/images/190830-threshold-logic/190830-OR.gif){: .center-image}

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

#### __2.2 Train the sorted power set of training instances according to the error-correction procedure__

The reason I sort the power set by the number of training instances is my task is to find the minimum training instance set for OR TLU. If I start to verify that each training instances set in the sorted power set satisfies OR TLU, my program will stop as soon as possible when it meets the suitable set, which is the minimum number of set like the blow steps.  
As the description mentioned, the initial weights all equal to 0. That's why `W` includes all 0 elements array. `desired_output` returns what the OR gate does.

{% highlight python %}

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

`train` function trains by `W <- W + X.T(d-f)` which is the error-correction procedure. This updates `W` while given `X` can't produce desired output. If it can create desired output, check the desired output is the same with or gate's desired one or not.

{% highlight python %}

def train(X, W, d, full_X):

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

{% endhighlight %}

<span style="font-family: Courier New;">
Training instances:  [[1 0 0]] <br/>
Initial weights [0 0 0] <br/>
Weights are updated:  [-1  0  0] <br/>
This training instances cannot make OR gate. <br/><br/>
Training instances:  [[1 0 1]] <br/>
Initial weights [0 0 0] <br/>
This training instances cannot make OR gate. <br/><br/>
Training instances:  [[1 1 0]] <br/>
Initial weights [0 0 0] <br/>
This training instances cannot make OR gate. <br/><br/>
Training instances:  [[1 1 1]] <br/>
Initial weights [0 0 0] <br/>
This training instances cannot make OR gate. <br/><br/>
Training instances:  [[1 0 0]
 [1 0 1]] <br/>
Initial weights [0 0 0] <br/>
Weights are updated:  [-1  0  0] <br/>
Weights are updated:  [0 0 1] <br/>
Weights are updated:  [-1  0  1] <br/>
This training instances cannot make OR gate. <br/><br/>
Training instances:  [[1 0 0]
 [1 1 0]] <br/>
Initial weights [0 0 0] <br/>
Weights are updated:  [-1  0  0] <br/>
Weights are updated:  [0 1 0] <br/>
Weights are updated:  [-1  1  0] <br/>
This training instances cannot make OR gate. <br/><br/>
Training instances:  [[1 0 1]
 [1 1 0]] <br/>
Initial weights [0 0 0] <br/>
This training instances cannot make OR gate. <br/><br/>
Training instances:  [[1 0 0]
 [1 1 1]] <br/>
Initial weights [0 0 0] <br/>
Weights are updated:  [-1  0  0] <br/>
Weights are updated:  [0 1 1] <br/>
Weights are updated:  [-1  1  1] <br/>
I end up finding minimal instances to make OR gate! <br/><br/>
Minimal training instances are [[1 0 0]
 [1 1 1]]
</span>

For the format of training instance, it is added one more
input whose value is always 1 into the first column. This means the real training instances should be [[0 0] [1 1]] without the first column. You can check all code here [OR.py link <span style="color:red; font-family: Babas;">__*Click!*__</span>](https://drive.google.com/file/d/1YGvby1NAhRDMJS8Ljcn1oHNGtskf_H9X/view?usp=sharing).




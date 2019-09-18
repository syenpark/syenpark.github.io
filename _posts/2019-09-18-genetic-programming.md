---
layout: post
title:  "Genetic Programming"
author: Syen Park
date:   2019-09-18
categories: artificial_intelligence
modified_date: 2019-09-18
---

### __1. Problem__

Design and implement *__a genetic programming system__* to *__evolve some perceptrons__* that match well with a given training set. A training set is a collection of tuples of the form (x1, ..., xn, l), where xi’s are real numbers and l is either 1 (positive example) or 0 (negative example). So for your genetic programming system, a 'program' is just a tuple (w1, ... , wn, θ) of numbers (weights and the threshold). Answer the following questions:

- What’s your fitness function?

- What’s your crossover operator?

- What’s your copy operator?

- What’s your mutation operator, if you use any?

- What’s the size of the initial generation, and how are programs generated?  

- When do you stop the evolution? Evolve it up to a fixed iteration, when it satisfies a condition on the fitness function, or a combination of the two?

- What’s the output of your system for the training set of the below one?  Its [training-set.csv link](https://drive.google.com/file/d/1KCycVKj2cIFJIilVlWr4DNgqbzxXgBrS/view?usp=sharing)   

  <iframe src="https://drive.google.com/file/d/1lGy_V9UWyO4CCHlvMVrr_FLzD1JhCoSv/preview" 
          width="100%" height="100%">
  </iframe>

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

You can check all code here [OR.py link <span style="color:red; font-family: Babas;">__*Click!*__</span>](https://drive.google.com/file/d/1YGvby1NAhRDMJS8Ljcn1oHNGtskf_H9X/view?usp=sharing).




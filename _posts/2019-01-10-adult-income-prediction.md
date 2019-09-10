---
layout: post
title:  "Adult Income Prediction"
author: Syen Park
date:   2019-01-10
categories: data_science
modified_date: 2019-09-11
---

### __1. Problem__

The dataset come from 1994 Census database. Prediction task is to determine whether a person makes over 50K a year. 
<iframe src="https://drive.google.com/file/d/1sFn1lvb3o7P4vggFRRi9rCRA5xl4UN33/preview" 
        width="100%" height="100%">
</iframe>

### __2. Solution__

This solution is written by myself and in Python 3. There could be some mistakes or it would be not the best solution. 

I use Pandas, XGBoost, and Scikit-Learn to solve this problem.

Import following libraries first.
{% highlight python %}import xgboost
import pandas as pd
from sklearn import tree
from sklearn.model_selection import train_test_split
{% endhighlight %}

Define delete_duplicated function to delete duplicated rows (objects) in dataset.
{% highlight python %}def delete_duplicated(objects):
    # delete duplicated
    objects['duplicated'] = objects.duplicated()
    filter_duplicated = objects['duplicated'] == False
    objects = objects[filter_duplicated]

    return objects
{% endhighlight %}

Feedback is very welcome.

TBU...

---
layout: post
title:  "Adult Income Prediction"
author: Syen Park
date:   2019-01-10
categories: data_science
modified_date: 2019-09-11
---

### __1. Problem__

The dataset come from 1994 Census database. Prediction task is to determine whether a person makes over 50K a year. Overall data is described in the following frame.
 
<iframe src="https://drive.google.com/file/d/1sFn1lvb3o7P4vggFRRi9rCRA5xl4UN33/preview" 
        width="100%" height="100%">
</iframe>

### __2. Solution__

I use Pandas, XGBoost, and Scikit-Learn on Python to solve this problem.

I define delete_duplicated function to delete duplicated rows (objects) in dataset.

{% highlight python %}

def delete_duplicated(objects):
    # delete duplicated
    objects['duplicated'] = objects.duplicated()
    filter_duplicated = objects['duplicated'] == False
    objects = objects[filter_duplicated]

    return objects

{% endhighlight %}

{% highlight python %}

def give_weight(objects, feature, n):
    min = objects[feature].min()
    max = objects[feature].max()
    denominator = max - min

    return objects.loc[objects.index.repeat((n * ((objects[feature] - min) / denominator)).astype(int))]

{% endhighlight %}

{% highlight python %}

def delete_features(objects, features):
    for f in features:
        del objects[f]

    return objects

{% endhighlight %}

{% highlight python %}

def decision_tree(objects, feature):
    t_x = objects.loc[objects[feature] != " ?"]
    t_x2 = objects.loc[objects[feature] == " ?"]

    t_l = t_x[feature]
    del t_x[feature]
    del t_x2[feature]

    t_x = pd.get_dummies(t_x)
    t_x2 = pd.get_dummies(t_x2)

    for c in t_x2.columns.difference(t_x.columns):
        t_x[c] = 0

    clf = tree.DecisionTreeClassifier()
    #clf = ensemble.ExtraTreesClassifier(n_estimators=10)
    clf = clf.fit(t_x.values, t_l.values)

    # predict
    for c in t_x.columns.difference(t_x2.columns):
        t_x2[c] = 0

    # impute missing values
    b = clf.predict(t_x2.values)
    new_df = pd.DataFrame({feature: b})
    objects.loc[objects[feature] == " ?", [feature]] = new_df

    return objects

{% endhighlight %}

{% highlight python %}

clf = xgboost.XGBClassifier(max_depth=8, n_estimators=300, learning_rate=0.5).fit(X_train, y_train)
print(clf.score(X_test, y_test))

{% endhighlight %}

<span style="font-family: Courier New;"> 0.9702109043554343 </span>

Feedback is very welcomed.

---
layout: post
title:  "Adult Income Prediction"
author: Syen Park
date:   2019-01-10
categories: data_science
modified_date: 2019-09-19
---

### __1. Problem__

The dataset come from 1994 Census database. Prediction task is to determine whether a person makes over 50K a year. Overall data is described in the following frame.
 
<iframe src="https://drive.google.com/file/d/1sFn1lvb3o7P4vggFRRi9rCRA5xl4UN33/preview" 
        width="100%" height="100%">
</iframe>

[Data link](https://drive.google.com/drive/folders/1nXYyUmTi7zrVDdsrySDdRLULvR11aADq?usp=sharing)

### __2. Solution__

I use Pandas, XGBoost, Scikit-Learn, and Seaborn on Python to solve this problem.

## collapsible markdown?

<details><summary>CLICK ME</summary>
<p>

ah

</p>
</details>

#### __2.1 Baseline model__

I check the basic data validity first to build its baseline model.

{% highlight python %}

data.info()

{% endhighlight %}


<span style="font-family: Courier New;"> 
<class 'pandas.core.frame.DataFrame'> <br/>
RangeIndex: 34189 entries, 0 to 34188 <br/>
Data columns (total 14 columns): <br/>
age               34189 non-null int64 <br/>
workclass         34189 non-null object <br/>
fnlwgt            34189 non-null int64 <br/>
education         34189 non-null object <br/>
education-num     34189 non-null int64 <br/>
Marital-status    34189 non-null object <br/>
occupation        34189 non-null object <br/>
relationship      34189 non-null object <br/>
race              34189 non-null object <br/>
sex               34189 non-null object <br/>
capital-gain      34189 non-null int64 <br/>
capital-loss      34189 non-null int64 <br/>
hours-per-week    34189 non-null int64 <br/>
native-country    34189 non-null object <br/>
dtypes: int64(6), object(8) <br/>
memory usage: 3.7+ MB </span>

{% highlight python %}

label.info()

{% endhighlight %}

<span style="font-family: Courier New;"> 
<class 'pandas.core.frame.DataFrame'> <br/>
RangeIndex: 34189 entries, 0 to 34188 <br/>
Data columns (total 1 columns): <br/>
\>50K    34189 non-null int64 <br/>
dtypes: int64(1) <br/>
memory usage: 267.2 KB </span>

Both have no null values and because of that, the baseline model can be built without any data processing.


{% highlight python %}

# One-hot encoding for categorial features
data_dummies = pd.get_dummies(data)

X = data_dummies.values
y = label.values

X_train, X_test, y_train, y_test = train_test_split(X, y.ravel(), random_state=0)

clf = xgboost.XGBClassifier(max_depth=8, n_estimators=300, learning_rate=0.5).fit(X_train, y_train)
print(clf.score(X_test, y_test))

{% endhighlight %}


### __3. Future work__
- 
- 

TBU...
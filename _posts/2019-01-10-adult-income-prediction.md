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

#### __2.1 Baseline model__

I check the basic data validity first to build its baseline model.

{% highlight python %}

data.info()

{% endhighlight %}

<details><summary>Click here if you want to see the result</summary>
<p>

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

</p>
</details>
<br/>

{% highlight python %}

label.info()

{% endhighlight %}

<details><summary>Click here if you want to see the result</summary>
<p>

<span style="font-family: Courier New;"> 
<class 'pandas.core.frame.DataFrame'> <br/>
RangeIndex: 34189 entries, 0 to 34188 <br/>
Data columns (total 1 columns): <br/>
>50K    34189 non-null int64 <br/>
dtypes: int64(1) <br/>
memory usage: 267.2 KB </span>

</p>
</details>
<br/>

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

<span style="font-family: Courier New;"> 
Accuracy: 87.997192326% </span>

#### __2.2 Correlation Analysis__

I concatenate people's features data and their income label to analyse its correlation.

{% highlight python %}
adult_income = pd.concat([data, label], axis=1)

{% endhighlight %}

This following the correlation heatmap and the correlation matrix show no strong correlation without any pre-processing. I can see `education-num` is the most related with income in raw data.

![A hitmap.png](/assets/images/190110-adult-income-prediction/hitmap.png){: .center-image} 

I check the overall data distribution for numerical features and label. This shows there is no data fault in label as there are only 0 or 1, binary data.

![A dist.png](/assets/images/190110-adult-income-prediction/dist.png){: .center-image} 

#### __2.3 Data Reliability__

Although the dataset is valid enough to run the baseline model, but I should check its reliability. With the above data distribution as histogram, I can't say there is invalid values in numerical features, so I investigate categorial feature's unique values to detection any problems. I can see some missing value represented as `' ?'` in categorial features.

{% highlight python %}

# for only categorial features
for c in adult_income.select_dtypes(include=['object']).columns:
    print(c + '\'s unique values:\n' , adult_income[c].unique(), '\n')

{% endhighlight %}

<details><summary>Click here if you want to see the result</summary>
<p>

<span style="font-family: Courier New;"> 
workclass's unique values: <br/>
 [' Private' ' State-gov' ' ?' ' Self-emp-not-inc' ' Local-gov' <br/>
 ' Self-emp-inc' ' Never-worked' ' Federal-gov' ' Without-pay']  <br/> <br/>

education's unique values: <br/>
 [' Assoc-voc' ' Some-college' ' 9th' ' 5th-6th' ' HS-grad' ' 12th' <br/>
 ' 7th-8th' ' 11th' ' 10th' ' Masters' ' Bachelors' ' Assoc-acdm' <br/>
 ' Prof-school' ' 1st-4th' ' Doctorate' ' Preschool']  <br/> <br/>

Marital-status's unique values: <br/>
 [' Never-married' ' Divorced' ' Separated' ' Married-civ-spouse' <br/>
 ' Married-spouse-absent' ' Widowed' ' Married-AF-spouse']  <br/> <br/>

occupation's unique values: <br/>
 [' Tech-support' ' Handlers-cleaners' ' Machine-op-inspct' <br/>
 ' Other-service' ' Craft-repair' ' Adm-clerical' ' ?' ' Exec-managerial' <br/>
 ' Protective-serv' ' Transport-moving' ' Prof-specialty' ' Sales' <br/>
 ' Farming-fishing' ' Priv-house-serv' ' Armed-Forces']  <br/> <br/>

relationship's unique values: <br/>
 [' Not-in-family' ' Own-child' ' Other-relative' ' Husband' ' Unmarried' <br/>
 ' Wife']  <br/> <br/>

race's unique values: <br/>
 [' White' ' Black' ' Amer-Indian-Eskimo' ' Asian-Pac-Islander' ' Other']  <br/> <br/>

sex's unique values: <br/>
 [' Male' ' Female']  <br/> <br/>

native-country's unique values: <br/>
 [' United-States' ' Mexico' ' El-Salvador' ' Germany' ' Philippines' <br/>
 ' Italy' ' ?' ' Jamaica' ' Canada' ' South' ' Columbia' ' China' ' Hong' <br/>
 ' Nicaragua' ' Puerto-Rico' ' India' ' Dominican-Republic' ' Haiti' <br/>
 ' England' ' Trinadad&Tobago' ' Taiwan' ' Cuba' ' France' ' Iran' <br/>
 ' Vietnam' ' Portugal' ' Cambodia' ' Japan' ' Guatemala' ' Thailand' <br/>
 ' Greece' ' Honduras' ' Poland' ' Hungary' ' Laos' ' Ireland' ' Ecuador' <br/>
 ' Yugoslavia' ' Peru' ' Outlying-US(Guam-USVI-etc)' ' Scotland' <br/>
 ' Holand-Netherlands'] </span>

</p>
</details> <br/>

I check `' ?'`, *__a missing data value__*, distribution for each categorial feature having it.

{% highlight python %}
adult_income['workclass'].value_counts()

{% endhighlight %}

<details><summary>Click here if you want to see the result</summary>
<p>

<span style="font-family: Courier New;"> 
 Private             23702 <br/>
 Self-emp-not-inc     2713 <br/>
 Local-gov            2218 <br/>
 ?                    1950 <br/>
 State-gov            1393 <br/>
 Self-emp-inc         1192 <br/>
 Federal-gov           995 <br/>
 Without-pay            16 <br/>
 Never-worked           10 <br/>
Name: workclass, dtype: int64 </span>

</p>
</details>
<br/>

{% highlight python %}

adult_income['occupation'].value_counts()

{% endhighlight %}

<details><summary>Click here if you want to see the result</summary>
<p>

<span style="font-family: Courier New;"> 
 Prof-specialty       4323 <br/>
 Exec-managerial      4285 <br/>
 Craft-repair         4244 <br/>
 Adm-clerical         3977 <br/>
 Sales                3852 <br/>
 Other-service        3407 <br/>
 Machine-op-inspct    2094 <br/>
 ?                    1960 <br/>
 Transport-moving     1672 <br/>
 Handlers-cleaners    1432 <br/>
 Farming-fishing      1084 <br/>
 Tech-support          982 <br/>
 Protective-serv       700 <br/>
 Priv-house-serv       168 <br/>
 Armed-Forces            9 <br/>
Name: occupation, dtype: int64 </span> <br/>

</p>
</details>
<br/>

{% highlight python %}

adult_income['native-country'].value_counts()

{% endhighlight %}

<details><summary>Click here if you want to see the result</summary>
<p>

<span style="font-family: Courier New;"> 
 United-States                 30722 <br/>
 Mexico                          669 <br/>
 ?                               589 <br/>
 Philippines                     208 <br/>
 Germany                         152 <br/>
 Canada                          129 <br/>
 Puerto-Rico                     127 <br/>
 India                           107 <br/>
 Cuba                            100 <br/>
 El-Salvador                     100 <br/>
 England                          89 <br/>
 South                            82 <br/>
 China                            79 <br/>
 Dominican-Republic               75 <br/>
 Italy                            71 <br/>
 Jamaica                          70 <br/>
 Guatemala                        62 <br/>
 Columbia                         61 <br/>
 Poland                           60 <br/>
 Japan                            56 <br/>
 Portugal                         51 <br/>
 Vietnam                          50 <br/>
 Taiwan                           47 <br/>
 Haiti                            47 <br/>
 Iran                             41 <br/>
 Greece                           35 <br/>
 Nicaragua                        32 <br/>
 France                           30 <br/>
 Peru                             28 <br/>
 Ecuador                          27 <br/>
 Hong                             22 <br/>
 Trinadad&Tobago                  22 <br/>
 Ireland                          21 <br/>
 Cambodia                         21 <br/>
 Thailand                         19 <br/>
 Outlying-US(Guam-USVI-etc)       17 <br/>
 Yugoslavia                       15 <br/>
 Laos                             14 <br/>
 Hungary                          14 <br/>
 Honduras                         14 <br/>
 Scotland                         13 <br/>
 Holand-Netherlands                1 <br/>
Name: native-country, dtype: int64 </span>

</p>
</details>
<br/>

#### __2.4 Impute missing value__

I use random forest, which is ensemble, to impute the missing value.

{% highlight python %}

def decision_tree(objects, target, features):
  for feature in features:
    train = objects.copy()
    test = target.copy()
    
    y = train[feature]
    
    del train[feature]
    del test[feature]
    
    train_dummies = pd.get_dummies(train)
    test_dummies = pd.get_dummies(test)
    
    # in case for having different subset of features 
    for c in train_dummies.columns.difference(test_dummies.columns):
        test_dummies[c] = 0
    
    for c in test_dummies.columns.difference(train_dummies.columns):
        train_dummies[c] = 0
    
    #clf = tree.DecisionTreeClassifier()
    #clf = ensemble.ExtraTreesClassifier(n_estimators=10)
    clf = ensemble.RandomForestClassifier(n_estimators=32)
    
    X_train, X_test, y_train, y_test = train_test_split(train_dummies.values, y.values, random_state=123)
    
    #tree.plot_tree(clf1.fit(X_train, y_train))
    
    clf.fit(X_train, y_train)
    print(clf.score(X_test, y_test))
    
    # predict
    for c in train.columns.difference(test_dummies.columns):
        test[c] = 0
    
    # impute missing values
    b = clf.predict(test_dummies.values)
    new_df = pd.DataFrame({feature: b})
    
    # combine
    imputed_df = target.drop([feature], axis=1)
    imputed_df[feature] = new_df.values

  return imputed_df
{% endhighlight %}

With random forest, the result of imputing missing value for `native-country` is about 92%, `workclass` is around 73%, but `occupation` is only 28% approximately.

<span style="font-family: Courier New;"> 
['native-country'] <br/>
0.9215611974232664 Accuracy <br/><br/>
['occupation'] <br/>
0.2865984590122521 Accuracy <br/><br/>
['workclass', 'occupation'] <br/>
0.7327270430718706 Accuracy <br/>
0.2839459391183529 Accuracy <br/><br/>
['workclass', 'occupation', 'native-country'] <br/>
0.7307060755336617 Accuracy <br/>
0.28419856006062905 Accuracy <br/>
0.9218138183655425 Accuracy <br/><br/>
</span>

### __3. Future work__
- 
- 

To be updated...
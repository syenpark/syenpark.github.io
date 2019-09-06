---
layout: post
title:  "Multivariable Regression"
author: Syen Park
date:   2019-09-07
categories: data_science
modified_date: 2019-09-07
---

### __Problem__

Do modeling the performance of computer programs. The dataset provided describes a few examples of running SGDClassifier in Python. The features of the dataset describes the SGDClassifier as well as the features used to generate the synthetic training data. The data to be analyzed is the training time of the SGDClassifier.

[Data link](https://www.kaggle.com/c/msbd5001-fall2018/data)

### __Solution__

I analyse the relation between features in training data and do feature engineering for the better prediction. A feed forward neural network is used to predict running time.

#### __Data Analysis__

I analyse dataset in terms of the description in [SGDClassifier in Scikit-Learn](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.SGDClassifier.html)  and use Numpy and Pandas.

{% highlight python %}
train = pd.read_csv('../data/train.csv')
print('Shape of the train data with all features:', train.shape)

test = pd.read_csv('../data/test.csv')
print('Shape of the test data with all features:', test.shape)
{% endhighlight %}

<span style="font-family: Courier New;"> Shape of the train data with all features: (400, 15) <br/>Shape of the test data with all features: (100, 14)</span>

{% highlight python %}
train[:400].plot(x='id', y='time')
{% endhighlight %}

![PCA plot](/assets/kaggle.png){: .center-image}

{% highlight python %}
train.corr()
{% endhighlight %}

With the above code, we can see the correlation with each feature and time. This result shows weak correlations with each feature and time. It means I need to work on feature engineering (feature selection). According to the above document, its __complexity__ is

> The major advantage of SGD is its efficiency, which is basically linear in the number of training examples. If X is a matrix of size (n, p) training has a cost of O(knp¯), where k is the number of iterations (epochs) and p¯ is the average number of non-zero attributes per sample.
>
> Recent theoretical results, however, show that the runtime to get some desired optimization accuracy does not increase as the training set size increases.

That means one of critical factorts to affect its performance is *__the number of objects (n)__* * *__iterations or epochs (k)__* in our dataset, rather than making them independent each other. Also, the feature (parameter) 'penalty' has 4 categories (options); 'none', 'l1', 'l2', and  'elasticnet'. This should be handled as *__a categorial feature__* unlike other 14 numerical features. I create a function to create new feature, *__'complexity'__* like below to see correlation my new created feature and time.

{% highlight python %}
def penalty_preprocessing(df, v):
    '''
    creates new feature 'complexity' according to the penalty option, v.
    '''
    new_df = df.loc[df['penalty'] == v]

​    new_df.loc[new_df['n_jobs'] == -1, ['n_jobs']] = 16

​    new_df.loc[:, ('complexity')] = new_df['n_samples'] * new_df['max_iter'] * new_df['n_features']
​    new_df.loc[:, ('complexity')] = new_df['complexity'] * new_df['n_classes']
​    new_df.loc[:, ('complexity')] = new_df['complexity'] / new_df['n_jobs']
​    new_df.loc[:, ('complexity')] = new_df['complexity'] + new_df['flip_y'] + new_df['random_state']

​    return new_df.loc[:, ('id', 'complexity', 'time')]    

{% endhighlight %}

For the complexity, *__'max_iter'__* represents *__k__* in the document, and *__'n_samples'__* * *__'n_features'__* * *__'n_classes'__* means overall the dataset's matrix size *__np¯__*, which I mutiply them all. On the other hand, *__'n_jobs'__* makes the performance faster as it is the number of CPU. It should be devided the complexity, then. The maximum *__'n_jobs'__* in dataset is 16 in the training dataset, so I replace -1 which means using all jobs with 16. 

{% highlight python %}

penalty_none = penalty_preprocessing(train, 'none')
penalty_l1 = penalty_preprocessing(train, 'l1')
penalty_l2 = penalty_preprocessing(train, 'l2')
penalty_elasticnet = penalty_preprocessing(train, 'elasticnet')

{% endhighlight %}

The above code creates new dataframe for each penalty respectively. Now, I can see my new created feature 'complexity' is correlated with time more than 97% for every penalty option like below.  

{% highlight python %}

penalty_none.corr()

{% endhighlight %}

![PCA plot](/assets/none.png)

{% highlight python %}

penalty_l1.corr()

{% endhighlight %}

![PCA plot](/assets/l1.png)

{% highlight python %}

penalty_l2.corr()

{% endhighlight %}

![PCA plot](/assets/l2.png)

{% highlight python %}

penalty_elasticnet.corr()

{% endhighlight %}

![PCA plot](/assets/ela.png)

#### __Feature engineering__

I use Scikit Learn and a pretrained model, ResNet-152, to extract features from images with reference
and improvement by myself on [a GitHub repository](https://github.com/christiansafka/img2vec) which provides only RseNet-18 and AlexNet
models with following steps.

1. Load images and extract features with pretrained model RESNET-152
   I add Resnet-152 model in that its error rate is the best according to [Pytorch Master
   Documentation](https://pytorch.org/docs/stable/torchvision/models.html). Its layer output size is 2048, so that extracted features size is also 2048.

2. Dimension reduction with PCA
   I reduce features size from 2048 to 200 by applying PCA in Scikit Learn. The reason why I
   chose 200 is that it keeps around 90% information of original features using sum of variance
   ratios. The below graph accounts for its detail.

   ![PCA plot](/assets/K-means_PCA.png){: .center-image}

#### __K-means clustering altorighm with silhouette analysis__

K-means clustering in Scikit Learn is used with the number of clusters 11 chosen with [silhouette
analysis](https://scikit-learn.org/stable/auto_examples/cluster/plot_kmeans_silhouette_analysis.html). The reasons as follows. Firstly, n_clusters 2, 3, 4, 5, 6, 7, and 11 are good choices for K in
that others have so many negative values that many samples of them would be assigned to the
incorrect cluster. Secondly, 11 has the most similar thickness of the silhouette plot that indicates
it has the most similar clusters size.

![PCA plot](/assets/sil_03.png){: .center-image}

![PCA plot](/assets/sil_08.png){: .center-image}

![PCA plot](/assets/sil_11.png){: .center-image}

As the result, each cluster accounts for those following objects:  
Cluster 1: Pet (Cat + Dog)  
Cluster 2: Car  
Cluster 3: Water Scenery  
Cluster 4: Indoor Scenery  
Cluster 5: Bus  
Cluster 6: Train  
Cluster 7: Birds  
Cluster 8: Airplane  
Cluster 9: Bicycle (including autocycle)  
Cluster 10: People  
Cluster 11: Livestock  

You can check all code here [Google Colab link](https://colab.research.google.com/drive/1PRfXoQzhmd71uWYso4M4SBqtQ2ikk5Pe) and the result [Prediction.csv link](https://drive.google.com/open?id=13aBm-IyWi9tWm5_VQ6q6eEyNNM4adzBd).

### __Future Work__

Replacing n_jobs = -1 should be more sophisticated, not just 16, which requires another data anaysis task.
---
layout: post
title:  "Image Clustering"
author: Syen Park
date:   2019-09-03
categories: machine_learning
modified_date: 2019-09-03
---

### __1. Problem__

Do image clustering, which is an unsupervised learning task. Unsupervised learning is a branch of machine learning that learns from test data  that  has  not  been  labeled,  classified  or  categorized.  Instead  of responding to feedback, unsupervised learning identifies commonalities in the data and reacts based on the presence or absence of such commonalities in each new piece of data.  In this task, you need to cluster a certain amount of image data. In other words, you  need  to  find  the  most  appropriate  number  of clusters by yourself.

[Image data link](https://www.dropbox.com/sh/gr2istwq2qrnjy8/AAD2dP8T57hQnDvh1UW-3wZUa?dl=0)

### __2. Solution__

I use K-means clustering algorithm for this problem.

#### __2.1 Feature engineering__

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

   ![PCA plot](/assets/images/190903-image-clustering/190903-K-means_PCA.png){: .center-image}

#### __2.2 K-means clustering altorighm with silhouette analysis__

K-means clustering in Scikit Learn is used with the number of clusters 11 chosen with [silhouette
analysis](https://scikit-learn.org/stable/auto_examples/cluster/plot_kmeans_silhouette_analysis.html). The reasons as follows. Firstly, n_clusters 2, 3, 4, 5, 6, 7, and 11 are good choices for K in
that others have so many negative values that many samples of them would be assigned to the
incorrect cluster. Secondly, 11 has the most similar thickness of the silhouette plot that indicates
it has the most similar clusters size.

![PCA plot](/assets/images/190903-image-clustering/190903-sil_03.png){: .center-image}

![PCA plot](/assets/images/190903-image-clustering/190903-sil_08.png){: .center-image}

![PCA plot](/assets/images/190903-image-clustering/190903-sil_11.png){: .center-image}

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

You can check all code here [Google Colab link <span style="color:red; font-family: Babas;">__*Click!*__</span>](https://colab.research.google.com/drive/1PRfXoQzhmd71uWYso4M4SBqtQ2ikk5Pe) and the result [Prediction.csv link](https://drive.google.com/open?id=13aBm-IyWi9tWm5_VQ6q6eEyNNM4adzBd).

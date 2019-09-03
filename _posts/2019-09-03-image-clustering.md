---
layout: post
title:  "Image Clustering"
author: Syen Park
date:   2019-09-03
categories: machine_learning
modified_date: 2019-09-03
---

### __Problem__

Do image clustering, which is an unsupervised learning task.

### __Solution__

I use K-means clustering algorithm for this problem.

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

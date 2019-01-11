---
layout: post
title:  "Adult Income Prediction"
author: Syen Park
date:   2019-01-10
categories: data_science
modified_date: 2019-01-11
---

# Task Description
The dataset come from 1994 Census database. Prediction task is to determine whether a person makes over 50K a year.

# Files Description
1. **trainFeatures.csv**: 34189 individual’s basic information with 14 attributes for training.
2. **testFeatures.csv**: 14653 individual’s basic information with 14 attributes for testing.
3. **trainLabels.csv**: 34189 individual’s incomes, 0: <=50k, 1: >50k.  
4. **sampleSubmission.csv**: The sample submission file you may refer.  

# Data Description
1. **trainFeatures.csv** & 2. **testFeatures.csv**  
_**age**_  
The age of the individual; this attribute is continuous.  
_**work-class**_  
The type of the employer that the individual has, involving Private, Self-emp-not-inc, Self-emp-inc, Federal-gov, Local-gov, State-gov, Without-pay, Never-worked; this attribute is nominal.  
_**fnlwgt**_  
Final weight, this is the number of people the census believes the entry represents; this attribute is continuous.  
_**education**_  
The highest level of education achieved for that individuals involving Preschool, 1st-4th, 5th-6th, 7th-8th, 9th, 10th, 11th, 12th, HS-grad, Prof-school, Assoc-acdm, Assoc-voc, Some-college, Bachelors, Masters,Doctorate;This attribute is nominal.  
_**education-num**_  
Highest level of education in numerical form; this attribute is continuous.  
_**marital-status**_  
Marital status of the individual, involving Divorced,Married-AF- spouse, Married-civ-spouse, Married-spouse-absent, Never-married, Separated, Widowed; This attribute is nominal.  
_**occupation**_  
The occupation of the individual, involving Tech-support, Craft- repair, Other-service, Sales, Exec-managerial, Prof-specialty, Handlers- cleaners, Machine-op-inspct, Adm-clerical, Farming-fishing, Transport-moving, Priv-house-serv, Protective-serv, Armed-Forces; This attribute is nominal.  
_**relationship**_  
The family relationship of the individual, involving Wife, Own-child, Husband, Not-in-family, Other-relative, Unmarried; This attribute is nominal. race: The race of the individual, involving White, Asian-Pac-Islander, Amer- Indian-Eskimo, Other, Black; This attribute is nominal.  
_**sex**_  
Female, Male; This attribute is nominal.  
_**capital-gain**_  
capital gains recorded; This attribute is continuous.  
_**capital-loss**_  
capital losses recorded; This attribute is continuous.  
_**hours-per-week**_   
Hours worked per week; This attribute is continuous.  
_**native-country**_  
label person’s country, involving United-States, Cambodia, England, Puerto-Rico, Canada, Germany, Outlying-US(Guam-USVI-etc), India, Japan, Greece, South, China, Cuba, Iran, Honduras, Philippines, Italy, Poland, Jamaica, Vietnam, Mexico, Portugal, Ireland, France, Dominican-Republic, Laos, Ecuador, Taiwan, Haiti, Columbia, Hungary, Guatemala, Nicaragua, Scotland, Thailand, Yugoslavia, El-Salvador, Trinadad&Tobago, Peru, Hong, Holand-Netherlands.

3. _**trainLabels.csv**_  
0: means a person makes no more than 50K a year, i.e. <=50k  
1: means a person makes over 50K a year, i.e. >50K

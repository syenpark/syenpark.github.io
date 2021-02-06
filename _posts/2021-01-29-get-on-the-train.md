---
layout: post
title:  "Get on the Train"
author: Syen Park
date:   2021-01-29
categories: data_science
modified_date: 2021-02-06
---
Data visualisation for housing prices in three cities.

### __1. Hong Kong__
The city in which I am currently living.  

<html>
  <head>
    <style>
      #trainHKG {
        position: relative;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <img id="trainHKG" src="https://js.cx/clipart/train.gif">
    <br/><br/>
    <button type="button" onclick="trainHKG()">Try it</button>
    <br/><br/>
    <script src="{{ site.baseurl }}{% link assets/js/2021-01-29-get-on-the-train.js %}"></script>
  </body>
</html>

### __2. Seoul__
My hometown.  

<html>
  <head>
    <style>
      #trainSEL {
        position: relative;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <img id="trainSEL" src="https://js.cx/clipart/train.gif">
    <br/><br/>
    <button type="button" onclick="trainSEL()">Try it</button>
    <br/><br/>
    <script src="{{ site.baseurl }}{% link assets/js/2021-01-29-get-on-the-train.js %}"></script>
  </body>
</html>

### __3. Tokyo__
The unprecedented rise in house prices and market crash.  


<html>
  <head>
    <style>
      #trainTYO {
        position: relative;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <img id="trainTYO" src="https://js.cx/clipart/train.gif">
    <br/><br/>
    <button type="button" onclick="trainTYO()">Try it</button>
    <br/><br/>
    <script src="{{ site.baseurl }}{% link assets/js/2021-01-29-get-on-the-train.js %}"></script>
  </body>
</html>

To be updated...

References: [JavaScript animations](https://javascript.info/js-animation)

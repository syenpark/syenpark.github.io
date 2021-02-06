---
layout: post
title:  "Get on the Train"
author: Syen Park
date:   2021-01-29
categories: data_science
modified_date: 2021-02-06
---
A simple data visualisation for housing prices rise for X years in three cities; Hong Kong, Seoul and Tokyo. This post is not completed yet and currently uses dummy data for test.

### __1. Hong Kong__
Hong Kong is notorious as the most unaffordable housing market in the world.

<html>
  <head>
    <style>
      #trainHKG {
        position: relative;
        cursor: pointer;
      }

      #HKG {
        position: relative;
        cursor: pointer;
      }

      .container {
        height: 20px;
        position: relative;
        border: none;
      }

      .horizontal-center {
        margin: 0;
        position: absolute;
        left: 48%;
      }
    </style>
  </head>
  <body>
    <img id="trainHKG" src="https://js.cx/clipart/train.gif">
    <br/><br/>
    <img id='HKG' width="10%" height="10%" src="https://image.freepik.com/free-icon/running-man_318-1564.jpg">
    <br/><br/>
    <p id='year' style="text-align:center">Year 1980</p>
    <div class="container">
      <div class="horizontal-center">
        <button type="button" onclick="trainHKG()">Play</button>
      </div>
    </div>
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

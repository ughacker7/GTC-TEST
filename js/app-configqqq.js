const questions = [
    {
        "question_hi": "यदि किसी घनाभ (Cuboid) की लंबाई (L) = 45 मीटर, चौड़ाई (B) = 28 मीटर तथा ऊँचाई (H) = 35 मीटर है, तो उसका आयतन (Volume) ज्ञात कीजिए?",
        "question_en": "If the length (L) = 45 m, breadth (B) = 28 m and height (H) = 35 m of a cuboid, find its volume?",
        "options_hi": ["(a) 41,200 m³", "(b) 44,100 m³", "(c) 43,800 m³", "(d) 46,500 m³"],
        "options_en": ["(a) 41,200 m³", "(b) 44,100 m³", "(c) 43,800 m³", "(d) 46,500 m³"],
        "answer": "(b) 44,100 m³"
    },
    {
        "question_hi": "यदि किसी आयत (Rectangle) का क्षेत्रफल 86,400 वर्ग मीटर है और इसकी चौड़ाई 120 मीटर है, तो इसका परिमाप (Perimeter) ज्ञात कीजिए?",
        "question_en": "If the area of a rectangle is 86,400 sq m and its breadth is 120 m, find its perimeter?",
        "options_hi": ["(a) 1,560 m", "(b) 1,720 m", "(c) 1,680 m", "(d) 1,840 m"],
        "options_en": ["(a) 1,560 m", "(b) 1,720 m", "(c) 1,680 m", "(d) 1,840 m"],
        "answer": "(c) 1,680 m"
    },
    {
        "question_hi": "यदि किसी वर्ग (Square) का परिमाप 360 मीटर है, तो इसका क्षेत्रफल क्या होगा?",
        "question_en": "If the perimeter of a square is 360 meters, what will be its area?",
        "options_hi": ["(a) 7,200 m²", "(b) 6,400 m²", "(c) 8,900 m²", "(d) 8,100 m²"],
        "options_en": ["(a) 7,200 m²", "(b) 6,400 m²", "(c) 8,900 m²", "(d) 8,100 m²"],
        "answer": "(d) 8,100 m²"
    },
    {
        "question_hi": "यदि साधारण ब्याज (SI) = ₹48,000, मूलधन (P) = ₹1,50,000 और समय (T) = 4 वर्ष है, तो ब्याज की दर (R%) ज्ञात कीजिए?",
        "question_en": "If Simple Interest (SI) = ₹48,000, Principal (P) = ₹1,50,000 and Time (T) = 4 years, find the rate of interest (R%)?",
        "options_hi": ["(a) 6% वार्षिक", "(b) 8% वार्षिक", "(c) 9.5% वार्षिक", "(d) 7% वार्षिक"],
        "options_en": ["(a) 6% per annum", "(b) 8% per annum", "(c) 9.5% per annum", "(d) 7% per annum"],
        "answer": "(b) 8% वार्षिक"
    },
    {
        "question_hi": "यदि 60 कुर्सियों (Chairs) का मूल्य ₹2,16,000 है, तो 145 कुर्सियों का मूल्य क्या होगा?",
        "question_en": "If the cost of 60 chairs is ₹2,16,000, what will be the cost of 145 chairs?",
        "options_hi": ["(a) ₹4,96,000", "(b) ₹5,22,000", "(c) ₹5,40,000", "(d) ₹5,12,000"],
        "options_en": ["(a) ₹4,96,000", "(b) ₹5,22,000", "(c) ₹5,40,000", "(d) ₹5,12,000"],
        "answer": "(b) ₹5,22,000"
    },
    {
        "question_hi": "यदि 25 kg काजू का मूल्य ₹22,500 है, तो 3 kg 600 g (3600 g) काजू का मूल्य कितना होगा?",
        "question_en": "If the price of 25 kg cashews is ₹22,500, what will be the price of 3 kg 600 g (3600 g) cashews?",
        "options_hi": ["(a) ₹2,880", "(b) ₹3,150", "(c) ₹3,420", "(d) ₹3,240"],
        "options_en": ["(a) ₹2,880", "(b) ₹3,150", "(c) ₹3,420", "(d) ₹3,240"],
        "answer": "(d) ₹3,240"
    },
    {
        "question_hi": "यदि किसी वर्ग का विकर्ण (Diagonal) 85√2 मीटर है, तो उसका परिमाप (Perimeter) क्या होगा?",
        "question_en": "If the diagonal of a square is 85√2 meters, what will be its perimeter?",
        "options_hi": ["(a) 320 m", "(b) 360 m", "(c) 340 m", "(d) 425 m"],
        "options_en": ["(a) 320 m", "(b) 360 m", "(c) 340 m", "(d) 425 m"],
        "answer": "(c) 340 m"
    },
    {
        "question_hi": "यदि किसी घन (Cube) की प्रत्येक भुजा 40 मीटर है, तो उसका कुल पृष्ठीय क्षेत्रफल (TSA) ज्ञात कीजिए?",
        "question_en": "If each edge of a cube is 40 meters, find its Total Surface Area (TSA)?",
        "options_hi": ["(a) 9,600 m²", "(b) 8,400 m²", "(c) 10,200 m²", "(d) 6,400 m²"],
        "options_en": ["(a) 9,600 m²", "(b) 8,400 m²", "(c) 10,200 m²", "(d) 6,400 m²"],
        "answer": "(a) 9,600 m²"
    },
    {
        "question_hi": "घातांक संख्या 2<sup>16</sup> का मान कितना होगा?",
        "question_en": "What is the value of the exponent 2<sup>16</sup>?",
        "options_hi": ["(a) 32,768", "(b) 1,31,072", "(c) 64,000", "(d) 65,536"],
        "options_en": ["(a) 32,768", "(b) 1,31,072", "(c) 64,000", "(d) 65,536"],
        "answer": "(d) 65,536"
    },
    {
        "question_hi": "यदि <span style='display:inline-block; vertical-align:middle; text-align:center; margin:0 4px;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 3px;'>8x + 65</span><span style='display:block; padding:0 3px;'>25</span></span> + 48 = 85 हो, तो x का मान ज्ञात कीजिए?",
        "question_en": "If <span style='display:inline-block; vertical-align:middle; text-align:center; margin:0 4px;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 3px;'>8x + 65</span><span style='display:block; padding:0 3px;'>25</span></span> + 48 = 85, then find the value of x?",
        "options_hi": ["(a) 107.5", "(b) 112.5", "(c) 98.5", "(d) 104.0"],
        "options_en": ["(a) 107.5", "(b) 112.5", "(c) 98.5", "(d) 104.0"],
        "answer": "(a) 107.5"
    },
    {
        "question_hi": "यदि <span style='display:inline-flex; align-items:center; vertical-align:middle; margin:0 4px;'><svg style='height:2.6em; width:16px; flex-shrink:0;' viewBox='0 0 16 46' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M1 28 L4 26 L8 44 L15 2'/></svg><span style='border-top:2px solid currentColor; margin-left:-2px; padding:3px 5px 0 3px; display:inline-block;'><span style='display:inline-block; vertical-align:middle; text-align:center;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 4px;'>12x - 44</span><span style='display:block; padding:0 4px;'>28</span></span></span></span> + 35 = 52 हो, तो x का मान ज्ञात कीजिए?",
        "question_en": "If <span style='display:inline-flex; align-items:center; vertical-align:middle; margin:0 4px;'><svg style='height:2.6em; width:16px; flex-shrink:0;' viewBox='0 0 16 46' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M1 28 L4 26 L8 44 L15 2'/></svg><span style='border-top:2px solid currentColor; margin-left:-2px; padding:3px 5px 0 3px; display:inline-block;'><span style='display:inline-block; vertical-align:middle; text-align:center;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 4px;'>12x - 44</span><span style='display:block; padding:0 4px;'>28</span></span></span></span> + 35 = 52, find the value of x?",
        "options_hi": ["(a) 642", "(b) 694", "(c) 678", "(d) 712"],
        "options_en": ["(a) 642", "(b) 694", "(c) 678", "(d) 712"],
        "answer": "(c) 678"
    },
    {
        "question_hi": "यदि <span style='display:inline-flex; align-items:center; vertical-align:middle; margin:0 4px;'><svg style='height:2.5em; width:10px; flex-shrink:0;' viewBox='0 0 10 46' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round'><path d='M8 2 C2 14, 2 32, 8 44'/></svg><span style='display:inline-block; vertical-align:middle; text-align:center; padding:0 4px;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 4px;'>14x + 15</span><span style='display:block; padding:0 4px;'>38</span></span><svg style='height:2.5em; width:10px; flex-shrink:0;' viewBox='0 0 10 46' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round'><path d='M2 2 C8 14, 8 32, 2 44'/></svg><span style='font-size:0.95em; font-weight:bold; align-self:flex-start; margin-top:-4px; margin-left:2px;'>2</span></span> + 45 = 110 हो, तो x का मान ज्ञात कीजिए?",
        "question_en": "If <span style='display:inline-flex; align-items:center; vertical-align:middle; margin:0 4px;'><svg style='height:2.5em; width:10px; flex-shrink:0;' viewBox='0 0 10 46' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round'><path d='M8 2 C2 14, 2 32, 8 44'/></svg><span style='display:inline-block; vertical-align:middle; text-align:center; padding:0 4px;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 4px;'>14x + 15</span><span style='display:block; padding:0 4px;'>38</span></span><svg style='height:2.5em; width:10px; flex-shrink:0;' viewBox='0 0 10 46' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round'><path d='M2 2 C8 14, 8 32, 2 44'/></svg><span style='font-size:0.95em; font-weight:bold; align-self:flex-start; margin-top:-4px; margin-left:2px;'>2</span></span> + 45 = 110, find the value of x?",
        "options_hi": [
            "(a) <span style='display:inline-block; vertical-align:middle; text-align:center;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 2px;'>15√65 + 38</span><span style='display:block; padding:0 2px;'>14</span></span>",
            "(b) <span style='display:inline-block; vertical-align:middle; text-align:center;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 2px;'>38√65 + 15</span><span style='display:block; padding:0 2px;'>14</span></span>",
            "(c) <span style='display:inline-block; vertical-align:middle; text-align:center;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 2px;'>14√65 - 15</span><span style='display:block; padding:0 2px;'>38</span></span>",
            "(d) <span style='display:inline-block; vertical-align:middle; text-align:center;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 2px;'>38√65 - 15</span><span style='display:block; padding:0 2px;'>14</span></span>"
        ],
        "options_en": [
            "(a) <span style='display:inline-block; vertical-align:middle; text-align:center;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 2px;'>15√65 + 38</span><span style='display:block; padding:0 2px;'>14</span></span>",
            "(b) <span style='display:inline-block; vertical-align:middle; text-align:center;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 2px;'>38√65 + 15</span><span style='display:block; padding:0 2px;'>14</span></span>",
            "(c) <span style='display:inline-block; vertical-align:middle; text-align:center;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 2px;'>14√65 - 15</span><span style='display:block; padding:0 2px;'>38</span></span>",
            "(d) <span style='display:inline-block; vertical-align:middle; text-align:center;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 2px;'>38√65 - 15</span><span style='display:block; padding:0 2px;'>14</span></span>"
        ],
        "answer": "(d) <span style='display:inline-block; vertical-align:middle; text-align:center;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 2px;'>38√65 - 15</span><span style='display:block; padding:0 2px;'>14</span></span>"
    },
    {
        "question_hi": "घनाभ (Cuboid) के कुल पृष्ठीय क्षेत्रफल (TSA) का सही सूत्र क्या होता है?",
        "question_en": "What is the correct formula for the Total Surface Area (TSA) of a cuboid?",
        "options_hi": [
            "(a) 2(lb + bh + hl)",
            "(b) l × b × h",
            "(c) 2(l + b) × h",
            "(d) 4(l + b + h)"
        ],
        "options_en": [
            "(a) 2(lb + bh + hl)",
            "(b) l × b × h",
            "(c) 2(l + b) × h",
            "(d) 4(l + b + h)"
        ],
        "answer": "(a) 2(lb + bh + hl)"
    },
    {
        "question_hi": "साधारण ब्याज में ब्याज की दर (R%) ज्ञात करने का सही सूत्र क्या है?",
        "question_en": "What is the correct formula to calculate the Rate of Interest (R%) in Simple Interest?",
        "options_hi": [
            "(a) <span style='display:inline-block; vertical-align:middle; text-align:center;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 3px;'>P × SI</span><span style='display:block; padding:0 3px;'>100 × T</span></span>",
            "(b) <span style='display:inline-block; vertical-align:middle; text-align:center;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 3px;'>P × T × 100</span><span style='display:block; padding:0 3px;'>SI</span></span>",
            "(c) <span style='display:inline-block; vertical-align:middle; text-align:center;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 3px;'>SI × 100</span><span style='display:block; padding:0 3px;'>P × T</span></span>",
            "(d) <span style='display:inline-block; vertical-align:middle; text-align:center;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 3px;'>SI × T</span><span style='display:block; padding:0 3px;'>P × 100</span></span>"
        ],
        "options_en": [
            "(a) <span style='display:inline-block; vertical-align:middle; text-align:center;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 3px;'>P × SI</span><span style='display:block; padding:0 3px;'>100 × T</span></span>",
            "(b) <span style='display:inline-block; vertical-align:middle; text-align:center;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 3px;'>P × T × 100</span><span style='display:block; padding:0 3px;'>SI</span></span>",
            "(c) <span style='display:inline-block; vertical-align:middle; text-align:center;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 3px;'>SI × 100</span><span style='display:block; padding:0 3px;'>P × T</span></span>",
            "(d) <span style='display:inline-block; vertical-align:middle; text-align:center;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 3px;'>SI × T</span><span style='display:block; padding:0 3px;'>P × 100</span></span>"
        ],
        "answer": "(c) <span style='display:inline-block; vertical-align:middle; text-align:center;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 3px;'>SI × 100</span><span style='display:block; padding:0 3px;'>P × T</span></span>"
    },
    {
        "question_hi": "आयत के विकर्ण (Diagonal of Rectangle) की लंबाई ज्ञात करने का सही सूत्र क्या है?",
        "question_en": "What is the correct formula to find the length of the diagonal of a rectangle?",
        "options_hi": [
            "(a) √(l + b)",
            "(b) 2(l + b)",
            "(c) l² + b²",
            "(d) √(l² + b²)"
        ],
        "options_en": [
            "(a) √(l + b)",
            "(b) 2(l + b)",
            "(c) l² + b²",
            "(d) √(l² + b²)"
        ],
        "answer": "(d) √(l² + b²)"
    },
    {
        "question_hi": "(a + b + c)<sup>2</sup> का सही बीजगणितीय सूत्र (Expansion) क्या होता है?",
        "question_en": "What is the correct algebraic expansion of (a + b + c)<sup>2</sup>?",
        "options_hi": [
            "(a) a² + b² + c² + ab + bc + ca",
            "(b) a² + b² + c² + 2ab + 2bc + 2ca",
            "(c) a² + b² + c² - 2ab - 2bc - 2ca",
            "(d) a³ + b³ + c³ + 3abc"
        ],
        "options_en": [
            "(a) a² + b² + c² + ab + bc + ca",
            "(b) a² + b² + c² + 2ab + 2bc + 2ca",
            "(c) a² + b² + c² - 2ab - 2bc - 2ca",
            "(d) a³ + b³ + c³ + 3abc"
        ],
        "answer": "(b) a² + b² + c² + 2ab + 2bc + 2ca"
    },
    {
        "question_hi": "1250 - [ 580 + { 240 - ( 160 - 4 × 25 ) } ] + <span style='display:inline-block; vertical-align:middle; text-align:center; margin:0 3px;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 3px;'>576</span><span style='display:block; padding:0 3px;'>24</span></span> × 15 का मान ज्ञात करें?",
        "question_en": "Evaluate: 1250 - [ 580 + { 240 - ( 160 - 4 × 25 ) } ] + <span style='display:inline-block; vertical-align:middle; text-align:center; margin:0 3px;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 3px;'>576</span><span style='display:block; padding:0 3px;'>24</span></span> × 15?",
        "options_hi": ["(a) 810", "(b) 890", "(c) 850", "(d) 780"],
        "options_en": ["(a) 810", "(b) 890", "(c) 850", "(d) 780"],
        "answer": "(c) 850"
    },
    {
        "question_hi": "2500 - [ 1100 + { 480 - ( 250 - 12 × 15 ) } ] + <span style='display:inline-block; vertical-align:middle; text-align:center; margin:0 3px;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 3px;'>784</span><span style='display:block; padding:0 3px;'>28</span></span> × 25 का मान ज्ञात करें?",
        "question_en": "Evaluate: 2500 - [ 1100 + { 480 - ( 250 - 12 × 15 ) } ] + <span style='display:inline-block; vertical-align:middle; text-align:center; margin:0 3px;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 3px;'>784</span><span style='display:block; padding:0 3px;'>28</span></span> × 25?",
        "options_hi": ["(a) 1580", "(b) 1740", "(c) 1620", "(d) 1690"],
        "options_en": ["(a) 1580", "(b) 1740", "(c) 1620", "(d) 1690"],
        "answer": "(d) 1690"
    },
    {
        "question_hi": "5000 - [ 2200 - { 900 - ( 400 - 25 × 12 ) + 80 } ] + <span style='display:inline-block; vertical-align:middle; text-align:center; margin:0 3px;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 3px;'>1024</span><span style='display:block; padding:0 3px;'>32</span></span> × 45 का मान ज्ञात करें?",
        "question_en": "Evaluate: 5000 - [ 2200 - { 900 - ( 400 - 25 × 12 ) + 80 } ] + <span style='display:inline-block; vertical-align:middle; text-align:center; margin:0 3px;'><span style='display:block; border-bottom:1.5px solid currentColor; padding:0 3px;'>1024</span><span style='display:block; padding:0 3px;'>32</span></span> × 45?",
        "options_hi": ["(a) 5120", "(b) 4980", "(c) 5260", "(d) 5040"],
        "options_en": ["(a) 5120", "(b) 4980", "(c) 5260", "(d) 5040"],
        "answer": "(a) 5120"
    },
    {
        "question_hi": "किसी संख्या के 9 से विभाजित होने का नियम (Divisibility Rule of 9) क्या है?",
        "question_en": "What is the Divisibility Rule of 9 for any number?",
        "options_hi": [
            "(a) संख्या का अंतिम अंक 9 होना चाहिए",
            "(b) संख्या के अंतिम दो अंक 9 से विभाजित होने चाहिए",
            "(c) संख्या के सभी अंकों का योग 9 से विभाजित होना चाहिए",
            "(d) संख्या एक विषम (Odd) संख्या होनी चाहिए"
        ],
        "options_en": [
            "(a) The last digit of the number must be 9",
            "(b) The last two digits must be divisible by 9",
            "(c) The sum of all digits of the number must be divisible by 9",
            "(d) The number must strictly be an odd number"
        ],
        "answer": "(c) संख्या के सभी अंकों का योग 9 से विभाजित होना चाहिए"
    },
    {
        "question_hi": "किसी संख्या के 8 से विभाजित होने का नियम (Divisibility Rule of 8) क्या है?",
        "question_en": "What is the Divisibility Rule of 8 for any number?",
        "options_hi": [
            "(a) संख्या का इकाई अंक 8 होना चाहिए",
            "(b) संख्या के सभी अंकों का योग 8 से विभाजित होना चाहिए",
            "(c) संख्या केवल 2 और 4 दोनों से कटनी चाहिए",
            "(d) संख्या के अंतिम तीन अंक (Last 3 digits) 8 से पूरी तरह विभाजित होने चाहिए"
        ],
        "options_en": [
            "(a) The unit digit of the number must be 8",
            "(b) The sum of all digits must be divisible by 8",
            "(c) The number must simply be divisible by 2 and 4",
            "(d) The last three digits of the number must be completely divisible by 8"
        ],
        "answer": "(d) संख्या के अंतिम तीन अंक (Last 3 digits) 8 से पूरी तरह विभाजित होने चाहिए"
    },
    {
        "question_hi": "संख्याओं 40, 60, 75, 90 और 120 का लघुत्तम समापवर्त्य (L.C.M) ज्ञात कीजिए?",
        "question_en": "Find the Least Common Multiple (L.C.M) of 40, 60, 75, 90 and 120?",
        "options_hi": ["(a) 1800", "(b) 3600", "(c) 2400", "(d) 1200"],
        "options_en": ["(a) 1800", "(b) 3600", "(c) 2400", "(d) 1200"],
        "answer": "(a) 1800"
    },
    {
        "question_hi": "दुनिया का सबसे बड़ा महासागर कौन-सा है?",
        "question_en": "Which is the largest ocean in the world?",
        "options_hi": ["(a) अटलांटिक महासागर", "(b) प्रशांत महासागर", "(c) हिन्द महासागर", "(d) आर्कटिक महासागर"],
        "options_en": ["(a) Atlantic Ocean", "(b) Pacific Ocean", "(c) Indian Ocean", "(d) Arctic Ocean"],
        "answer": "(b) प्रशांत महासागर"
    },
    {
        "question_hi": "रूस (Russia) की राजधानी कहाँ है?",
        "question_en": "Where is the capital of Russia located?",
        "options_hi": ["(a) सेंट पीटर्सबर्ग", "(b) कीव", "(c) मॉस्को", "(d) पेरिस"],
        "options_en": ["(a) Saint Petersburg", "(b) Kyiv", "(c) Moscow", "(d) Paris"],
        "answer": "(c) मॉस्को"
    },
    {
        "question_hi": "दुनिया की सबसे बड़ी मीठे पानी की झील (Freshwater Lake) किसे कहा जाता है?",
        "question_en": "Which lake is known as the largest freshwater lake in the world?",
        "options_hi": ["(a) कैस्पियन सागर", "(b) विक्टोरिया झील", "(c) वुलर झील", "(d) सुपीरियर झील"],
        "options_en": ["(a) Caspian Sea", "(b) Lake Victoria", "(c) Wular Lake", "(d) Lake Superior"],
        "answer": "(d) सुपीरियर झील"
    },
    {
        "question_hi": "महात्मा गांधी का जन्म कब हुआ था?",
        "question_en": "When was Mahatma Gandhi born?",
        "options_hi": [
            "(a) 15 अगस्त 1872",
            "(b) 26 जनवरी 1889",
            "(c) 14 नवंबर 1880",
            "(d) 2 अक्टूबर 1869"
        ],
        "options_en": [
            "(a) 15 August 1872",
            "(b) 26 January 1889",
            "(c) 14 November 1880",
            "(d) 2 October 1869"
        ],
        "answer": "(d) 2 अक्टूबर 1869"
    },
    {
        "question_hi": "कैलकुलेटर (यांत्रिक कैलकुलेटर - Pascaline) की खोज किसने की थी?",
        "question_en": "Who invented the mechanical calculator (Pascaline)?",
        "options_hi": [
            "(a) चार्ल्स बैबेज",
            "(b) थॉमस एडिसन",
            "(c) ब्लेज़ पास्कल",
            "(d) आइजैक न्यूटन"
        ],
        "options_en": [
            "(a) Charles Babbage",
            "(b) Thomas Edison",
            "(c) Blaise Pascal",
            "(d) Isaac Newton"
        ],
        "answer": "(c) ब्लेज़ पास्कल"
    },
    {
        "question_hi": "यदि ₹2,50,000 की राशि पर 12% वार्षिक दर से 2 वर्ष के लिए वार्षिक रूप से संयोजित चक्रवृद्धि ब्याज (Compound Interest) कितना होगा?",
        "question_en": "What will be the Compound Interest on an amount of ₹2,50,000 at 12% per annum for 2 years, compounded annually?",
        "options_hi": ["(a) ₹60,000", "(b) ₹63,600", "(c) ₹65,200", "(d) ₹62,400"],
        "options_en": ["(a) ₹60,000", "(b) ₹63,600", "(c) ₹65,200", "(d) ₹62,400"],
        "answer": "(b) ₹63,600"
    },
    {
        "question_hi": "₹5,00,000 की धनराशि पर 10% वार्षिक चक्रवृद्धि ब्याज की दर से 3 वर्ष बाद कुल मिश्रधन (Total Amount) कितना प्राप्त होगा?",
        "question_en": "What will be the total Amount received on a principal of ₹5,00,000 at 10% annual compound interest after 3 years?",
        "options_hi": ["(a) ₹6,65,500", "(b) ₹6,50,000", "(c) ₹6,72,800", "(d) ₹6,80,000"],
        "options_en": ["(a) ₹6,65,500", "(b) ₹6,50,000", "(c) ₹6,72,800", "(d) ₹6,80,000"],
        "answer": "(a) ₹6,65,500"
    },
    {
        "question_hi": "₹8,00,000 की धनराशि पर 15% वार्षिक दर से 2 वर्ष के लिए चक्रवृद्धि ब्याज और साधारण ब्याज के बीच का अंतर (Difference between CI and SI) क्या होगा?",
        "question_en": "What will be the difference between Compound Interest and Simple Interest on a sum of ₹8,00,000 at 15% per annum for 2 years?",
        "options_hi": ["(a) ₹18,000", "(b) ₹16,500", "(c) ₹20,000", "(d) ₹19,200"],
        "options_en": ["(a) ₹18,000", "(b) ₹16,500", "(c) ₹20,000", "(d) ₹19,200"],
        "answer": "(a) ₹18,000"
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questions };
}
const c=function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?e.credentials="include":t.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function n(t){if(t.ep)return;t.ep=!0;const e=s(t);fetch(t.href,e)}};c();const r=document.querySelector("#app");r.innerHTML=`<div class="container">

        <button type="button" class="collapsible">
            <h1> Aplicaciones Web </h1>
        </button>
        <div class="content container">
            <p style="text-align:center;"> <a href="Apps/python/Calculator.html"
                    class="btn btn-custom btn-lg page-scroll"> Python Calculator </a> </p>
            <p style="text-align:center;"> <a href="Apps/python/Elevar-numero.html"
                    class="btn btn-custom btn-lg page-scroll"> Raise Number at 2 </a> </p>
            <p style="text-align:center;"> <a href="Apps/python/kinetic_energy.html"
                    class="btn btn-custom btn-lg page-scroll"> Kinetic Energy Calculator</a> </p>
            <p style="text-align:center;"> <a href="Apps/javascript/Speech Synthesis/index-FINISHED.html"
                    class="btn btn-custom btn-lg page-scroll"> Speech Synthesis</a> </p>
            <p style="text-align:center;"> <a href="Apps/new-year-countdown/index.html"
                    class="btn btn-custom btn-lg page-scroll"> New Year Counter</a> </p>
            <p style="text-align:center;"> <a href="Apps/relaxer-app/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Relaxer App</a> </p>
            <p style="text-align:center;"> <a href="Apps/javascript/DrumKit-keyboard/index-FINISHED.html"
                    class="btn btn-custom btn-lg page-scroll"> Drum kit (require keyboard)</a> </p>
            <p style="text-align:center;"> <a href="Apps/javascript/Drum-kit/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Drum kit v2 (require keyboard) </a> </p>
            <p style="text-align:center;"> <a href="Apps/python/Python-coderunner.html"
                    class="btn btn-custom btn-lg page-scroll"> Python Code Runner </a> </p>
            <p style="text-align:center;"> <a href="Apps/python/Python-coderunner2.html"
                    class="btn btn-custom btn-lg page-scroll"> Python Code Runner v2 </a> </p>
        </div>
        <hr>

        <button type="button" class="collapsible">
            <h1 style="text-align:center;"><img src="https://media.giphy.com/media/xUA7bgMIp4tTfcnEsM/giphy.gif"
                    width="60" height="60"> Games <img src="https://media.giphy.com/media/xUA7bgMIp4tTfcnEsM/giphy.gif"
                    width="60" height="60"> </h1>
        </button>
        <div class="content container ">
            <p style="text-align:center;"> <a href="html5-games/0hn0/Build/index.html"
                    class="btn btn-custom btn-lg page-scroll"> 0hn0 </a> </p>
            <p style="text-align:center;"> <a href="html5-games/3dchest/index.html"
                    class="btn btn-custom btn-lg page-scroll"> 3D Chess </a> </p>
            <p style="text-align:center;"> <a href="html5-games/Align-4-Game/Build/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Align 4 Game</a> </p>
            <p style="text-align:center;"> <a href="html5-games/BlockFall/Build/index.html"
                    class="btn btn-custom btn-lg page-scroll"> BlockFall</a> </p>
            <p style="text-align:center;"> <a href="html5-games/breakout-game/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Breakout Game</a> </p>
            <p style="text-align:center;"> <a href="html5-games/car-racing-js-master/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Car Racing </a> </p>
            <p style="text-align:center;"> <a href="html5-games/CircleNinja/build/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Circle Ninja </a> </p>
            <p style="text-align:center;"> <a href="html5-games/CirclePath/build/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Circle Path </a> </p>

            <p style="text-align:center;"> <a href="html5-games/Coil/Build/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Coil </a> </p>
            <p style="text-align:center;"> <a href="html5-games/clashjs/public/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Clash </a> </p>
            <p style="text-align:center;"> <a href="html5-games/ColorMatch/build/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Color Match </a> </p>
            <p style="text-align:center;"> <a href="html5-games/emoji-minesweeper/build/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Emoji Minesweeper </a> </p>
            <p style="text-align:center;"> <a href="html5-games/flappy-bird-master/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Flappy Bird (PC)</a> </p>
            <p style="text-align:center;"> <a href="html5-games/Flip-Card/build/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Flip Card </a> </p>
            <p style="text-align:center;"> <a href="html5-games/hangman/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Hangman</a> </p>
            <p style="text-align:center;"> <a href="html5-games/HexGL/build/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Hex GL </a> </p>
            <p style="text-align:center;"> <a href="html5-games/Nail/build/index.html"
                    class="btn btn-custom btn-lg page-scroll">Nail </a> </p>
            <p style="text-align:center;"> <a href="html5-games/p2ball/build/index.html"
                    class="btn btn-custom btn-lg page-scroll">P2 Ball </a> </p>
            <p style="text-align:center;"> <a href="html5-games/pacman-canvas/index.htm"
                    class="btn btn-custom btn-lg page-scroll"> Pacman </a> </p>
            <p style="text-align:center;"> <a href="html5-games/PinBall/build/index.html"
                    class="btn btn-custom btn-lg page-scroll">Pin Ball </a> </p>
            <p style="text-align:center;"> <a href="html5-games/pond/build/index.html"
                    class="btn btn-custom btn-lg page-scroll">Pond </a> </p>
            <p style="text-align:center;"> <a href="html5-games/pickle-rick-maze-game/dist/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Pickle Rick Maze Game </a> </p>
            <p style="text-align:center;"> <a href="html5-games/picture-puzzle-js-master/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Picture Puzzle </a> </p>
            <p style="text-align:center;"> <a href="html5-games/racer/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Racer </a> </p>
            <p style="text-align:center;"> <a href="html5-games/Simon-Says/Build/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Simon Says </a> </p>
            <p style="text-align:center;"> <a href="html5-games/skifree.js/build/index.html"
                    class="btn btn-custom btn-lg page-scroll"> SkiFree </a> </p>
            <p style="text-align:center;"> <a href="html5-games/Snake2/build/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Snake </a> </p>
            <p style="text-align:center;"> <a href="html5-games/SpaceInvaders/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Space Invaders (PC)</a> </p>
            <p style="text-align:center;"> <a href="html5-games/tic-tac-toe/dist/index.html"
                    class="btn btn-custom btn-lg page-scroll">Tic Tac Toe</a> </p>
            <p style="text-align:center;"> <a href="html5-games/canvas-tetris/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Tetris </a> </p>
            <p style="text-align:center;"> <a href="html5-games/TowerBlocks/build/index.html"
                    class="btn btn-custom btn-lg page-scroll"> TowerBlocks </a> </p>
            <p style="text-align:center;"> <a href="Apps/javascript/Whack-a-mole/index-FINISHED.html"
                    class="btn btn-custom btn-lg page-scroll"> Whack A Mole </a> </p>
            <p style="text-align:center;"> <a href="Apps/javascript/accelerategame.html"
                    class="btn btn-custom btn-lg page-scroll"> Acelerator Game (PC)</a> </p>
            <p style="text-align:center;"> <a href="html5-games/mariohtml5/main.html"
                    class="btn btn-custom btn-lg page-scroll"> Mario Bros (PC)</a> </p>
            <p style="text-align:center;"> <a href="html5-games/mario-js-html-master/index.html"
                    class="btn btn-custom btn-lg page-scroll"> Mario Bros (PC)</a> </p>

        </div>
    </div>
    </div>
    <hr>

    <!-- Contact Section -->
    <div id="contact" class="text-center">
        <div class="container">
            <div class="section-title center">
                <h1>
                    <p style="text-align:center;"> <img
                            src="https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/source.gif" width="300" height="300">
                    </p>
                </h1>

                <h2>Contacto</h2>
                <hr>
            </div>
            <div class="social">
                <a href="https://wa.me/50671127802"><i class="fa fa-whatsapp"
                        style="font-size:48px;color:white"></i></a></li>
                <a href="https://www.linkedin.com/in/bfpr131095/"><i class="fa fa-linkedin"
                        style="font-size:48px;color:white"></i></a></li>
                <a href="https://www.facebook.com/NeighborDevCR"><i class="fa fa-facebook"
                        style="font-size:48px;color:white"></i> </a></li>
                <a href="https://www.xing.com/profile/BrealyFabian_PadronRodriguez/cv"><i class="fa fa-xing"
                        style="font-size:48px;color:white"></i></a></li>
            </div>
        </div>
    </div>
    </div>
    </div>
`;

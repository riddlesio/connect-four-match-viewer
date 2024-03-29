import React        from 'react';
import component    from 'omniscient';
import Overlay      from './Overlay.jsx';
import FieldView    from './FieldView.jsx';

const GameView = component('GameView', function (props) {

    const { state, settings } = props;
    const { round, column, winner, illegalMove } = state;
    const { players } = settings;

    let moveText = illegalMove;
    let moveClass = 'Connect4Game-illegalMove ';
    let moveTextPlayer0 = '';
    let moveTextPlayer1 = '';

    if (illegalMove === '') {
        moveText = 'Column ' + column;
    } else {
        moveClass = 'Connect4Game-illegalMove illegal';
    }

    if (state.player === 0) {
        moveTextPlayer0 = moveText;
    } else {
        moveTextPlayer1 = moveText;
    }

    const moveClassPlayer0 = moveClass + ' player0';
    const moveClassPlayer1 = moveClass + ' player1 ';

    return (
        <svg className="Connect4Game" viewBox="0 0 1200 705" preserveAspectRatio="xMidYMid meet">
            <defs>
                <symbol id="background-playername-red">
                    <g>
                        <polygon
                            fill="#AC0000"
                            points="362,64.3 240,64.3 240,27.3 362,27.3 354,45.3"
                        />
                        <rect x="65" y="17.3" fill="#E00C0C" width="191" height="37"/>
                        <g>
                            <path
                                fill="#AC0000"
                                d="M37.2,69.6c-18.7,0-34-15.3-34-34c0-18.7,15.3-34,34-34s34,15.3,34,34C71.2,54.3,56,69.6,37.2,69.6z"
                            />
                            <path
                                fill="#E00C0C"
                                d="M37.2,2.6c18.2,0,33,14.8,33,33s-14.8,33-33,33s-33-14.8-33-33S19,2.6,37.2,2.6 M37.2,0.6c-19.3,0-35,15.7-35,35s15.7,35,35,35s35-15.7,35-35S56.5,0.6,37.2,0.6L37.2,0.6z"
                            />
                        </g>
                    </g>
                    <g>
                        <g>
                            <path
                                fill="#FFFFFF"
                                d="M53.2,39.7c0.3-1.2,0.4-2.5,0.4-3.8c0-5.1-2.2-9.6-5.7-12.7v-5.4c0-1-0.8-1.9-1.9-1.9c-1,0-1.9,0.8-1.9,1.9v2.8C42,19.6,39.5,19,36.8,19c0,0,0,0,0,0c-2.6,0-5.1,0.6-7.4,1.7v-2.8c0-1-0.8-1.9-1.9-1.9c-1,0-1.9,0.8-1.9,1.9v5.4c-3.5,3.1-5.7,7.6-5.7,12.7c0,1.3,0.1,2.6,0.4,3.8H53.2z M44.6,28.9c2.5,0,4.6,1.7,4.6,4.3c0,2.6-2.9,4.3-5.4,4.3s-4.6-1.2-4.6-3.8C39.2,31.2,42.1,28.9,44.6,28.9z M29.1,28.9c2.5,0,5.4,2.2,5.4,4.8c0,2.6-2.1,3.8-4.6,3.8c-2.5,0-5.4-1.7-5.4-4.3C24.5,30.6,26.5,28.9,29.1,28.9z M49.1,41.6l-2.8,5.1l-2.8-5.1H30l-2.8,5.1l-2.8-5.1h-6.2C20.9,49.4,28.2,55,36.8,55c0,0,0,0,0,0c8.6,0,15.9-5.6,18.5-13.4H49.1z"
                            />
                        </g>
                    </g>
                </symbol>
                <symbol id="background-playername-yellow">
                    <g>
                        <polygon
                            fill="#062B4E"
                            points="0,63.9 122,63.9 122,26.9 0,26.9 8,44.9"
                            id="polygon5"
                            style={{ fill: '#a38d00', fillOpacity: 1 }}
                        />
                        <rect x="106" y="16.9" fill="#0072FF" width="191" height="37" id="rect7"
                            style= {{ fill: '#e7cb00', fillOpacity: 1 }}
                        />
                        <g id="g9">
                            <path
                                fill="#062B4E"
                                d="M324.8,69.2c-18.7,0-34-15.3-34-34c0-18.7,15.3-34,34-34s34,15.3,34,34C358.8,53.9,343.5,69.2,324.8,69.2z"
                                id="path11"
                                style={{ fill: '#a38d00', fillOpacity: 1 }}
                            />
                            <g id="g13" style={{ fill: '#fcd665', fillOpacity: 1 }}>
                                <path
                                    fill="#0072FF"
                                    d="M324.8,2.2c18.2,0,33,14.8,33,33s-14.8,33-33,33s-33-14.8-33-33S306.5,2.2,324.8,2.2 M324.8,0.2c-19.3,0-35,15.7-35,35s15.7,35,35,35s35-15.7,35-35S344.1,0.2,324.8,0.2L324.8,0.2z"
                                    id="path15"
                                    style={{ fill: '#fcd665', fillOpacity: 1 }}
                                />
                            </g>
                        </g>
                    </g>
                    <path
                        fill="#FFFFFF"
                        d="M344.8,44.6c0-4.3-0.7-8.4-2.1-12.1c-0.6,0.5-1.4,0.9-2.3,0.9c-2.2,0-4-2.2-4-4.8c0-1.7,0.7-3.2,1.8-4 c-3.5-4.3-8-6.9-13-6.9l0,0l0,0c0,0,0,0,0,0l0,0c-5,0-9.6,2.6-13,6.9c1.1,0.9,1.8,2.3,1.8,4c0,2.7-1.8,4.8-4,4.8  c-0.8,0-1.6-0.3-2.3-0.9c-1.3,3.6-2.1,7.7-2.1,12.1h6.1c0,0,0,0,0,0c0-2.2,0.9-3.9,2.1-3.9c1.1,0,2.1,1.8,2.1,3.9c0,0,0,0,0,0h9.2h0  h9.2c0,0,0,0,0,0c0-2.2,0.9-3.9,2.1-3.9c1.1,0,2.1,1.8,2.1,3.9c0,0,0,0,0,0H344.8z M318.9,39c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4  c2.2,0,4,1.8,4,4C322.9,37.2,321.1,39,318.9,39z M331.8,39c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4c2.2,0,4,1.8,4,4  C335.8,37.2,334,39,331.8,39z" id="path17" />
                </symbol>
                <symbol id="block-." viewBox="0 0 100 100">
                    <g transform="translate(0,-620)">
                        <g transform="matrix(0.12517385,0,0,0.125,-30.111265,625)">
                            <path
                                d="M 640,691.8 C 457.4,691.8 308.7,543.1 308.7,360.5 308.7,177.9 457.4,28.2 640,28.2 c 182.6,0 331.3,148.7 331.3,331.3 0,182.6 -148.7,332.3 -331.3,332.3 z"
                                style={{ fill: '#2d2d2d' }}
                            />
                            <path
                                d="m 640,37.6 c 177.9,0 321.9,144.9 321.9,321.9 0,177.9 -144.9,321.9 -321.9,321.9 -177.9,0 -321.9,-144.9 -321.9,-321.9 0,-177 144,-321.9 321.9,-321.9 m 0,-18.8 c -188.2,0 -340.7,153.4 -340.7,341.6 0,188.2 152.5,340.8 340.7,340.8 188.2,0 340.7,-152.5 340.7,-340.7 C 980.7,172.3 828.2,18.8 640,18.8 l 0,0 z"
                                style={{ fill: '#5b5b5b' }}
                            />
                            <path
                                d="m 640,18.8 c 188.2,0 340.7,152.5 340.7,340.7 C 980.7,547.7 828.2,700.2 640,700.2 451.8,700.2 299.3,547.8 299.3,359.5 299.3,172.2 451.8,18.8 640,18.8 M 640,0 C 441.4,0 280.5,161.9 280.5,360.5 280.5,559.1 442.4,720 640,720 838.6,720 999.5,558.1 999.5,360.5 999.5,161.9 838.6,0 640,0 l 0,0 z"
                            />
                        </g>
                    </g>
                </symbol>
                <symbol id="block-0" viewBox="0 0 100 100">
                    <g transform="matrix(1.1780105,0,0,1.1764706,6.8192679,5.0000004)">
                        <g>
                            <path
                                clipRule="evenodd"
                                d="M 38.3,73.5 C 18.9,73.5 3.1,57.7 3.1,38.3 3.1,18.9 18.9,3 38.3,3 57.7,3 73.5,18.8 73.5,38.2 73.5,57.6 57.7,73.5 38.3,73.5 z"
                                style={{ fill: '#f72640', fillRule: 'evenodd' }}
                            />
                            <path
                                d="M 38.3,4 C 57.2,4 72.5,19.4 72.5,38.2 72.5,57.1 57.1,72.4 38.3,72.4 19.4,72.4 4.1,57 4.1,38.2 4.1,19.4 19.4,4 38.3,4 m 0,-2 C 18.3,2 2.1,18.3 2.1,38.3 c 0,20 16.2,36.2 36.2,36.2 20,0 36.2,-16.2 36.2,-36.2 C 74.5,18.3 58.3,2 38.3,2 l 0,0 z"
                                style={{ fill: '#8b122a' }}
                            />
                            <path
                                d="m 38.3,2 c 20,0 36.2,16.2 36.2,36.2 0,20 -16.2,36.2 -36.2,36.2 C 18.3,74.4 2.1,58.2 2.1,38.2 2.1,18.3 18.3,2 38.3,2 m 0,-2 C 17.2,0 0.1,17.2 0.1,38.3 0.1,59.4 17.3,76.5 38.3,76.5 59.4,76.5 76.5,59.3 76.5,38.3 76.5,17.2 59.4,0 38.3,0 l 0,0 z"
                            />
                        </g>
                        <path
                            clipRule="evenodd"
                            d="M 38.3,15 C 51.1,15 61.5,25.4 61.5,38.2 61.5,51 51.1,61.4 38.3,61.4 25.5,61.4 15.1,51.1 15.1,38.3 15.1,25.4 25.5,15 38.3,15 z"
                            style={{ fill: '#d70f37', fillRule: 'evenodd' }}
                        />
                    </g>
                    <path
                        style={{ fill: '#f72640', opacity: 1, fillOpacity: 1 }}
                        d="m 49.529185,73.334084 c -9.786505,-0.91182 -18.229064,-7.390336 -21.160688,-16.23796 -0.870334,-2.626679 -1.062299,-3.912795 -1.062299,-7.117287 0,-2.467621 0.04717,-3.121614 0.314067,-4.355309 1.360502,-6.288495 4.913152,-11.418473 10.396664,-15.012659 8.250888,-5.408068 19.589398,-5.408068 27.840283,0 5.483512,3.594186 9.036162,8.724164 10.396663,15.012659 0.266905,1.233695 0.314068,1.887688 0.314068,4.355309 0,3.204492 -0.191965,4.490608 -1.062305,7.117287 -3.468469,10.467822 -14.42143,17.314553 -25.976453,16.23796 z m 7.3653,-1.395526 c 4.858241,-1.046229 8.766481,-3.156202 12.190735,-6.581509 3.674989,-3.67611 5.712252,-7.721688 6.367461,-12.644416 C 76.846568,42.240038 70.192263,32.222 59.527168,28.736808 56.928382,27.88756 55.383143,27.670471 51.937069,27.670471 c -3.446068,0 -4.991313,0.217089 -7.590096,1.066337 -10.658422,3.483012 -17.318534,13.509785 -15.925513,23.975825 0.655645,4.926012 2.696036,8.976344 6.367461,12.639874 3.739623,3.731585 8.071846,5.936145 13.346296,6.791593 1.924713,0.312167 6.897059,0.195485 8.759268,-0.205542 z m -9.14187,-5.398061 c -0.19809,-0.07448 -0.468983,-0.319625 -0.601971,-0.544764 -0.386341,-0.654018 -0.308547,-1.303556 0.249738,-2.085267 1.273094,-1.782577 1.817608,-2.657161 2.124386,-3.41214 0.700832,-1.72476 1.065345,-4.853876 0.565432,-4.853876 -0.119903,0 -0.98476,-0.286819 -1.921903,-0.637382 -2.454086,-0.918007 -2.468804,-0.915533 -3.941445,0.662848 -1.925754,2.064032 -2.837399,2.468536 -4.105452,1.821627 -0.478509,-0.244118 -0.555699,-0.355746 -0.641456,-0.927634 -0.115785,-0.772071 0.0072,-1.456584 0.327227,-1.821484 0.728765,-0.830904 4.813673,-3.72493 6.068821,-4.299553 0.799463,-0.366009 0.911901,-0.369929 2.803366,-0.09766 0.536489,0.07722 0.575688,0.05745 0.738124,-0.372919 0.163495,-0.433161 0.128608,-0.5268 -0.743932,-1.996744 -3.290392,-5.543205 -5.9547,-11.45255 -5.163538,-11.45255 0.09938,0 0.251453,0.08674 0.337945,0.192756 0.08649,0.106014 1.028776,1.26923 2.093966,2.584937 2.246295,2.774572 3.850678,4.580653 4.888028,5.502523 0.860651,0.764837 2.255504,1.634617 2.62142,1.634617 0.354631,0 0.333969,-0.34111 -0.168717,-2.785053 -0.622103,-3.024534 -0.688657,-2.758115 1.046665,-4.190043 l 1.471588,-1.214311 0.489103,0.348002 c 0.269004,0.191403 0.639911,0.615847 0.824237,0.943206 0.303655,0.539305 0.33286,0.748162 0.310951,2.224062 -0.01327,0.895875 -0.08913,2.47749 -0.168523,3.514696 -0.126066,1.647029 -0.115828,1.929349 0.08086,2.229534 0.594008,0.906561 2.32294,0.708178 5.859943,-0.672407 1.207487,-0.471306 2.76206,-1.075421 3.454611,-1.342475 2.23979,-0.863679 3.344129,-1.04606 3.344129,-0.552278 0,0.543337 -2.391533,2.245877 -8.710885,6.201311 -3.267746,2.045364 -3.824467,2.339841 -5.416264,2.864922 -0.641887,0.211735 -1.197013,0.43344 -1.233626,0.492679 -0.03664,0.05926 -0.192301,1.063239 -0.345989,2.231122 -0.153688,1.167877 -0.416966,2.532572 -0.585073,3.032654 -1.390267,4.135746 -4.266448,7.410749 -5.951765,6.777049 z" />
                </symbol>
                <symbol id="block-1" viewBox="0 0 100 100">
                    <g transform="matrix(1.1780105,0,0,1.1764706,4.882199,5.0000004)">
                        <g>
                            <path
                                clipRule="evenodd"
                                d="M 38.3,73.5 C 18.9,73.5 3.1,57.7 3.1,38.3 3.1,18.9 18.9,3 38.3,3 57.7,3 73.5,18.8 73.5,38.2 73.5,57.6 57.7,73.5 38.3,73.5 z"
                                fill="#f9e10a"
                                fillRule="evenodd"
                            />
                            <path
                                d="M 38.3,4 C 57.2,4 72.5,19.4 72.5,38.2 72.5,57.1 57.1,72.4 38.3,72.4 19.4,72.4 4.1,57 4.1,38.2 4.1,19.4 19.4,4 38.3,4 m 0,-2 C 18.3,2 2.1,18.3 2.1,38.3 c 0,20 16.2,36.2 36.2,36.2 20,0 36.2,-16.2 36.2,-36.2 C 74.5,18.3 58.3,2 38.3,2 l 0,0 z"
                                fill="#7f6b00"
                            />
                            <path
                                d="m 38.3,2 c 20,0 36.2,16.2 36.2,36.2 0,20 -16.2,36.2 -36.2,36.2 C 18.3,74.4 2.1,58.2 2.1,38.2 2.1,18.3 18.3,2 38.3,2 m 0,-2 C 17.2,0 0.1,17.2 0.1,38.3 0.1,59.4 17.3,76.5 38.3,76.5 59.4,76.5 76.5,59.3 76.5,38.3 76.5,17.2 59.4,0 38.3,0 l 0,0 z" />
                        </g>
                        <path
                            clipRule="evenodd"
                            d="M 38.3,15 C 51.1,15 61.5,25.4 61.5,38.2 61.5,51 51.1,61.4 38.3,61.4 25.5,61.4 15.1,51.1 15.1,38.3 15.1,25.4 25.5,15 38.3,15 z"
                            fill="#debf18"
                            fillRule="evenodd"
                        />
                    </g>
                    <path
                        fill="#f9e10a"
                        d="m 47.592116,73.334084 c -9.786505,-0.91182 -18.229064,-7.390336 -21.160688,-16.23796 -0.870334,-2.626679 -1.062299,-3.912795 -1.062299,-7.117287 0,-2.467621 0.04717,-3.121614 0.314067,-4.355309 1.360502,-6.288495 4.913152,-11.418473 10.396664,-15.012659 8.250888,-5.408068 19.589398,-5.408068 27.840283,0 5.483512,3.594186 9.036162,8.724164 10.396663,15.012659 0.266905,1.233695 0.314068,1.887688 0.314068,4.355309 0,3.204492 -0.191965,4.490608 -1.062305,7.117287 -3.468469,10.467822 -14.42143,17.314553 -25.976453,16.23796 z m 7.3653,-1.395526 c 4.858241,-1.046229 8.766481,-3.156202 12.190735,-6.581509 3.674989,-3.67611 5.712252,-7.721688 6.367461,-12.644416 C 74.909499,42.240038 68.255194,32.222 57.590099,28.736808 54.991313,27.88756 53.446074,27.670471 50,27.670471 c -3.446068,0 -4.991313,0.217089 -7.590096,1.066337 -10.658422,3.483012 -17.318534,13.509785 -15.925513,23.975825 0.655645,4.926012 2.696036,8.976344 6.367461,12.639874 3.739623,3.731585 8.071846,5.936145 13.346296,6.791593 1.924713,0.312167 6.897059,0.195485 8.759268,-0.205542 z m -9.14187,-5.398061 c -0.19809,-0.07448 -0.468983,-0.319625 -0.601971,-0.544764 -0.386341,-0.654018 -0.308547,-1.303556 0.249738,-2.085267 1.273094,-1.782577 1.817608,-2.657161 2.124386,-3.41214 0.700832,-1.72476 1.065345,-4.853876 0.565432,-4.853876 -0.119903,0 -0.98476,-0.286819 -1.921903,-0.637382 -2.454086,-0.918007 -2.468804,-0.915533 -3.941445,0.662848 -1.925754,2.064032 -2.837399,2.468536 -4.105452,1.821627 -0.478509,-0.244118 -0.555699,-0.355746 -0.641456,-0.927634 -0.115785,-0.772071 0.0072,-1.456584 0.327227,-1.821484 0.728765,-0.830904 4.813673,-3.72493 6.068821,-4.299553 0.799463,-0.366009 0.911901,-0.369929 2.803366,-0.09766 0.536489,0.07722 0.575688,0.05745 0.738124,-0.372919 0.163495,-0.433161 0.128608,-0.5268 -0.743932,-1.996744 -3.290392,-5.543205 -5.9547,-11.45255 -5.163538,-11.45255 0.09938,0 0.251453,0.08674 0.337945,0.192756 0.08649,0.106014 1.028776,1.26923 2.093966,2.584937 2.246295,2.774572 3.850678,4.580653 4.888028,5.502523 0.860651,0.764837 2.255504,1.634617 2.62142,1.634617 0.354631,0 0.333969,-0.34111 -0.168717,-2.785053 -0.622103,-3.024534 -0.688657,-2.758115 1.046665,-4.190043 l 1.471588,-1.214311 0.489103,0.348002 c 0.269004,0.191403 0.639911,0.615847 0.824237,0.943206 0.303655,0.539305 0.33286,0.748162 0.310951,2.224062 -0.01327,0.895875 -0.08913,2.47749 -0.168523,3.514696 -0.126066,1.647029 -0.115828,1.929349 0.08086,2.229534 0.594008,0.906561 2.32294,0.708178 5.859943,-0.672407 1.207487,-0.471306 2.76206,-1.075421 3.454611,-1.342475 2.23979,-0.863679 3.344129,-1.04606 3.344129,-0.552278 0,0.543337 -2.391533,2.245877 -8.710885,6.201311 -3.267746,2.045364 -3.824467,2.339841 -5.416264,2.864922 -0.641887,0.211735 -1.197013,0.43344 -1.233626,0.492679 -0.03664,0.05926 -0.192301,1.063239 -0.345989,2.231122 -0.153688,1.167877 -0.416966,2.532572 -0.585073,3.032654 -1.390267,4.135746 -4.266448,7.410749 -5.951765,6.777049 z"
                    />
                </symbol>
                <symbol id="connect4-background" viewBox="0 0 672 552" width="1100" height="500">
                    <g>
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="#226ADD"
                            d="M669,545.8c0,1.7-1.3,3-3,3H6c-1.7,0-3-1.3-3-3V5.7c0-1.7,1.3-3,3-3h660c1.7,0,3,1.3,3,3V545.8z"
                        />
                        <path
                            d="M666,5.7v540H6V5.7H666 M666-0.3H6C2.7-0.3,0,2.7,0,6v540c0,3.3,2.7,5.8,6,5.8h660c3.3,0,6-2.4,6-5.8V6C672,2.7,669.3-0.3,666-0.3L666-0.3z"
                        />
                        <path
                            fill="#407AED"
                            d="M666,5.7v540H6V5.7H666 M666,1.7H6c-2.2,0-4,2-4,4.2v540c0,2.2,1.8,3.8,4,3.8h660c2.2,0,4-1.5,4-3.8V6C670,3.8,668.2,1.7,666,1.7L666,1.7z"
                        />
                    </g>
                </symbol>
            </defs>
            { FieldView(state) }
            <g className="Connect4Game-playerView-left">
                <use
                    x="40"
                    y="20"
                    xlinkHref="#background-playername-red"
                    transform="translate(-10,0)"
                />
                <text x="110" y="61" className="Connect4Game-playerName">
                    { players.names[0] }
                </text>
                <text x="110" y="110" className={ moveClassPlayer0 }>{ moveTextPlayer0 }</text>
            </g>
            <g className="Connect4Game-playerView-right">
                <use
                    x={ 1200 - 328 - 40 }
                    y="20"
                    xlinkHref="#background-playername-yellow"
                    transform="translate(-20,0)"
                />
                <text x={ 1200 - 110 } y="61" className="Connect4Game-playerName">
                    { players.names[1] }
                </text>
                <text x="1090" y="110" className={ moveClassPlayer1 }>{ moveTextPlayer1 }</text>
            </g>
            <text x="50%" y="70" className="Connect4Game-currentRound">{ `Round ${round}` }</text>
            <Overlay winner={ winner } />
        </svg>
    );
});

export default GameView;

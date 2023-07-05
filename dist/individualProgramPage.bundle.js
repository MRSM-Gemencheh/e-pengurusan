/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/individualProgramPage/program.js":
/*!**********************************************!*\
  !*** ./src/individualProgramPage/program.js ***!
  \**********************************************/
/***/ (() => {

eval("\r\n\r\n\r\nconst queryString = window.location.search;\r\nconsole.log(queryString);\r\n\r\nconst urlParams = new URLSearchParams(queryString);\r\n\r\n\r\nconst docID = urlParams.get('docID')\r\nconsole.log(docID);\n\n//# sourceURL=webpack://e-pengurusan/./src/individualProgramPage/program.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/individualProgramPage/program.js"]();
/******/ 	
/******/ })()
;
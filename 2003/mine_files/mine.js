/*/
/// MINE NODE CONSTRUCTOR
/// This creates a default node for the mine game to be used for
/// keeping track of its status, if it is a mine, and how many mines
/// are surrounding it.
/*/
function mineNode() {
	// Properties
	this.strStatus = "unclicked";
	this.boolIsMine = false;
	this.intSurroundingMines = 0;
}

/*/
/// MINE GAME CONSTRUCTOR
/// This creates a mine game
/*/
function mineGame(rows, cols, mines) {
	// Properties
	this.boolGameOver = false;
	this.intFlags = 0;
	this.intQuestions = 0;
	this.intRows = parseInt(rows);
	this.intCols = parseInt(cols);
	this.intMines = parseInt(mines);
	this.intRemainingSpaces = this.intRows * this.intCols;
	this.strDivHTML = "";
	this.arrRows = new Array(rows);
	
	// Methods
	this.createBoard = function() {
		for(var i = 0; i < this.intCols; i++) {
			this.arrRows[i] = new Array(this.intCols);
		}
		for(var i = 0; i < this.intRows; i++) {
			for(var j = 0; j < this.intCols; j++){
				this.arrRows[i][j] = new mineNode();
			}
		}
		for(var i = 0; i < this.intMines; i++) {
			var intMineRow = Math.floor(Math.random()*this.intRows);
			var intMineColumn = Math.floor(Math.random()*this.intCols);
			if(!this.arrRows[intMineRow][intMineColumn].boolIsMine) {
				this.arrRows[intMineRow][intMineColumn].boolIsMine = true;
			}
			else {
				i--;
			}
		}
		for(var i = 0; i < this.intRows; i++) {
			for(var j = 0; j < this.intCols; j++) {
				this.strDivHTML += "<img src=\"unclicked.gif\" name=\"node" + i + "-" + j + "\" id=\"node" + i + "-" + j + "\" border=\"0\" onmouseover=\"window.status=objGame.updateStatus(this.name);return true;\" onclick=\"objGame.checkClick('node" + i + "-" + j + "' )\" oncontextmenu=\"objGame.rightClick('node" + i + "-" + j + "' );return false;\">";
				for(var k = -1; k < 2; k++) {
					for(var l = -1; l < 2 ; l++) {
						if(i+k >= 0 && i+k < this.intRows && j+l >=0 && j+l < this.intCols) {
							if(this.arrRows[i+k][j+l].boolIsMine) {
								this.arrRows[i][j].intSurroundingMines++;
							}
						}
					}
				}
			}
			this.strDivHTML += "<br>";
		}
		document.all['mineBoard'].innerHTML = this.strDivHTML;
	}
	this.checkClick = function(nodeName) {
		if(!this.boolGameOver) {
			var intMineRow = nodeName.substring(4,nodeName.indexOf('-'));
			var intMineColumn = nodeName.substring(nodeName.indexOf('-')+1,nodeName.length);
			if(intGameTime == 0) {
				this.startGame();
			}
			if(this.arrRows[intMineRow][intMineColumn].strStatus == "rightclicked") {
				return false;
			}
			else if(this.arrRows[intMineRow][intMineColumn].boolIsMine) {
				this.endGame(0);
			}
			else if(this.arrRows[intMineRow][intMineColumn].intSurroundingMines == 0) {
				this.displaySurroundings(intMineRow, intMineColumn);
			}
			else {
				this.arrRows[intMineRow][intMineColumn].strStatus = "displayed";
				document.images[nodeName].src = this.arrRows[intMineRow][intMineColumn].intSurroundingMines + '.gif';
				this.intRemainingSpaces--;
				if(this.intRemainingSpaces == this.intMines) {
					this.endGame(1);
				}
			}
		}
	}
	this.rightClick = function(nodeName) {
		if(!this.boolGameOver) {
			var intMineRow = nodeName.substring(4, nodeName.indexOf('-'));
			var intMineColumn = nodeName.substring(nodeName.indexOf('-')+1, nodeName.length);
			if(this.arrRows[intMineRow][intMineColumn].strStatus == "unclicked") {
				this.arrRows[intMineRow][intMineColumn].strStatus = "rightclicked";
				document.images[nodeName].src = "flag.gif";
				this.intFlags++;
				updateMines();
			}
			else if(this.arrRows[intMineRow][intMineColumn].strStatus == "rightclicked") {
				this.arrRows[intMineRow][intMineColumn].strStatus = "rightclickedtwice";
				document.images[nodeName].src = "question.gif";
				this.intFlags--;
				this.intQuestions++;
				updateMines();
			}
			else if(this.arrRows[intMineRow][intMineColumn].strStatus == "rightclickedtwice") {
				this.arrRows[intMineRow][intMineColumn].strStatus = "unclicked";
				document.images[nodeName].src = "unclicked.gif";
				this.intQuestions--;
			}
		}
	}
	this.displaySurroundings = function(intRow, intCol) {
		var intRow = parseInt(intRow);
		var intCol = parseInt(intCol);
		for(var k = -1; k < 2; k++) {
			for(var l = -1; l < 2 ; l++) {
				if(intRow+k >= 0 && intRow+k < this.intRows && intCol+l >=0 && intCol+l < this.intCols) {
					if(this.arrRows[parseInt(intRow+k)][parseInt(intCol+l)].intSurroundingMines == 0 && this.arrRows[parseInt(intRow+k)][parseInt(intCol+l)].strStatus != "displayed") {
						this.arrRows[parseInt(intRow+k)][parseInt(intCol+l)].strStatus = "displayed";
						this.displaySurroundings(parseInt(intRow+k), parseInt(intCol+l));
						document.images['node'+parseInt(intRow+k)+'-'+parseInt(intCol+l)].src = this.arrRows[parseInt(intRow+k)][parseInt(intCol+l)].intSurroundingMines + '.gif';
						this.intRemainingSpaces--;
						if(this.intRemainingSpaces == this.intMines) {
							this.endGame(1);
						}
					}
					else {
						if (this.arrRows[parseInt(intRow+k)][parseInt(intCol+l)].strStatus != "displayed") {
							this.arrRows[parseInt(intRow+k)][parseInt(intCol+l)].strStatus = "displayed";
							document.images['node'+parseInt(intRow+k)+'-'+parseInt(intCol+l)].src = this.arrRows[parseInt(intRow+k)][parseInt(intCol+l)].intSurroundingMines + '.gif';
							this.intRemainingSpaces--;
							if(this.intRemainingSpaces == this.intMines) {
								this.endGame(1);
							}
						}
					}
				}
			}
		}
	}
	this.displayItems = function(strItem) {
		for(var i = 0; i < this.intRows; i++) {
			for(var j = 0; j < this.intCols; j++) {
				if(this.arrRows[i][j].boolIsMine) {
					document.images['node'+i+'-'+j].src = strItem+".gif";
				}
			}
		}				
	}
	this.updateStatus = function(nodeName) {
		var intMineRow = nodeName.substring(4, nodeName.indexOf('-'));
		var intMineColumn = nodeName.substring(nodeName.indexOf('-')+1, nodeName.length);
		return "["+intMineRow+":"+intMineColumn+"] [status: "+this.arrRows[intMineRow][intMineColumn].strStatus+"] [isMine: "+this.arrRows[intMineRow][intMineColumn].boolIsMine+"] [surroundingMines: "+this.arrRows[intMineRow][intMineColumn].intSurroundingMines+"] - [Remaining Spaces: "+this.intRemainingSpaces+"]";
	}
	this.startGame = function() {
		intGameTime = 1;
		document.all['time'].innerHTML = intGameTime;
		intTimer = window.setTimeout("updateTime();",1000);
	}
	this.endGame = function(boolYouWon) {
		this.boolGameOver = true;
		if(boolYouWon) {
			this.displayItems("flag");
			this.intFlags = this.intMines;
			updateMines();
			alert("You Win!");
		}
		else {
			this.displayItems("mine");
			alert("You Lose!");
		}
	}
}						
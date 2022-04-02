import React, { useState, useEffect } from "react";
import BlackKnight from "./black.jpeg";
import WhiteKnight from "./white.jpeg";

export default function Boxx() {
	const [chess, setChess] = useState([]);
	const [knightNextPositions, setKnightNextPositions] = useState([]);
	const [knightPos, setKnightPos] = useState({ x: -1, y: -1 });

	const cell = {
		width: "75px",
		height: "75px",
	};

	const red = {
		width: "100px",
		height: "100px",
		backgroundColor: "red",
	};
	const chessBox = {
		width: 75 * 8,
		display: "flex",
		flexWrap: "wrap",
		marginTop: "20px",
		boxShadow: `0px 10px 10px rgba(0,0,0,0.1)`,
	};

	const isOutBound = (x1, y1) => {
		return x1 < 0 || y1 < 0 || x1 > 7 || y1 > 7;
	};

	const handleClick = (x, y) => {
		setKnightPos({ x, y });
		// console.log({x,y});
		const dx = [-2, 2];
		const dy = [-1, 1];
		let positions = [];
		for (let i of dx) {
			for (let j of dy) {
				let x1 = x + i;
				let y1 = y + j;
				console.log({ x1, y1 });
				if (!isOutBound(x1, y1)) {
					positions.push(x1 * 8 + y1);
				}

				x1 = x + j;
				y1 = y + i;

				if (!isOutBound(x1, y1)) {
					positions.push(x1 * 8 + y1);
				}
			}
		}
		setKnightNextPositions(positions);
		console.log(positions);
		console.log(positions.includes({ x: 1, y: 2 }));
	};

	const makeChessBoard = () => {
		let arr = [];
		for (let i = 0; i < 8; i++) {
			let temp = [];
			for (let j = 0; j < 8; j++) {
				const coor = i * 8 + j;
				if ((i + j) % 2)
					temp.push(
						<div
							style={{
								...cell,
								backgroundColor:
									knightPos.x === i && knightPos.y === j
										? "green"
										: knightNextPositions.indexOf(coor) !== -1
										? "red"
										: "black",
							}}
							onClick={() => {
								handleClick(i, j);
							}}>
							{knightPos.x == i && knightPos.y == j && (
								<img src={WhiteKnight} width='100px' height='100px' />
							)}
						</div>
					);
				else
					temp.push(
						<div
							style={{
								...cell,
								backgroundColor:
									knightPos.x === i && knightPos.y === j
										? "green"
										: knightNextPositions.indexOf(coor) !== -1
										? "red"
										: "white",
							}}
							onClick={() => handleClick(i, j)}>
							{knightPos.x == i && knightPos.y == j && (
								<img src={BlackKnight} width='100px' height='100px' />
							)}
						</div>
					);
			}
			arr.push(temp);
		}
		setChess(arr);
	};

	useEffect(() => {
		makeChessBoard();
	}, [knightPos]);
	return (
		<div className='chess'>
			<div>
				<h2 className='heading'> ChessBoard Application </h2>
			</div>
			<section style={chessBox}>{chess}</section>
		</div>
	);
}

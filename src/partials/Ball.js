import { SVG_NS } from '../settings';

export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;

        this.ping = new Audio('public/sounds/pong-01.wav');
        this.miss = new Audio('public/sounds/miss.mp3');

        this.reset();
    } // End of Constructor

    reset() {
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;

        this.vy = 0;
        while (this.vy === 0) {
            this.vy = Math.floor(Math.random() * 10 - 5);
        }
        this.vx = this.direction * (6 - Math.abs(this.vy));
    } // End of Reset

    wallCollision() {
        const hitLeft = this.x - this.radius <= 0;
        const hitRight = this.x + this.radius >= this.boardWidth;
        const hitTop = this.y - this.radius <= 0;
        const hitBottom = this.y + this.radius >= this.boardHeight;


        if (hitLeft || hitRight) {
            this.vx = -this.vx;
            this.miss.play();
        } else if (hitTop || hitBottom) {
            this.vy = -this.vy;
        }
    }

    paddleCollision(player1, player2) {
        if (this.vx > 0) {
            // ball is moving the right and only check for player2
            let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
            let [leftX, rightX, topY, bottomY] = paddle;
            if (
                (this.x + this.radius >= leftX) &&
                (this.x + this.radius <= rightX) &&
                (this.y >= topY && this.y <= bottomY)
            ) {
                this.vx = -this.vx;
                this.ping.play();
            }
        } else {
            // check the player1 collision
            let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
            let [leftX, rightX, topY, bottomY] = paddle;
            if (
                (this.x - this.radius <= rightX) &&
                (this.x - this.radius >= leftX) &&
                (this.y >= topY && this.y <= bottomY)
            ) {
                this.vx = -this.vx;
                this.ping.play();
            }
        }
    }
    goal(player) {
        player.score++;
        this.reset();
        console.log(player.score);
    }




    render(svg, player1, player2) {
        // update x position with vector direction
        this.x += this.vx;
        this.y += this.vy;

        this.wallCollision();
        this.paddleCollision(player1, player2);

        let circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttributeNS(null, 'r', this.radius);
        circle.setAttributeNS(null, 'cx', this.x);  // x position
        circle.setAttributeNS(null, 'cy', this.y);  // y position
        circle.setAttributeNS(null, 'fill', 'yellow');
        circle.setAttributeNS(null, 'stroke', 'black');
        svg.appendChild(circle);

        const rightGoal = this.x + this.radius >= this.boardWidth;
        const leftGoal = this.x - this.radius <= 0;
        if (rightGoal) {
            this.goal(player1);
            this.direction = 1;
        } else if (leftGoal) {
            this.goal(player2);
            this.direction = -1;
        }
    }


} // End of Ball Class



//  extra goals 
//  add color inside contructor ()
// then add this.color = color
// then replace 'yellow' in render to color
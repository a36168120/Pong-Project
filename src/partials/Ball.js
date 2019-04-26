import { SVG_NS } from '../settings';

export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;
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
        } else if (hitTop || hitBottom) {
            this.vy = -this.vy;
        }
    }


    render(svg, player1, player2) {
        // update x position with vector direction
        this.x += this.vx;
        this.y += this.vy;

        this.wallCollision();

        let circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttributeNS(null, 'r', this.radius);
        circle.setAttributeNS(null, 'cx', this.x);  // x position
        circle.setAttributeNS(null, 'cy', this.y);  // y position
        circle.setAttributeNS(null, 'fill', 'yellow');
        circle.setAttributeNS(null, 'stroke', 'black');
        svg.appendChild(circle);
    }


} // End of Ball Class



//  extra goals 
//  add color inside contructor ()
// then add this.color = color
// then replace 'yellow' in render to color
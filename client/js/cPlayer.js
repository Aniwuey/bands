import { GLOBALS } from './Globals';

export class cPlayer {
  constructor(initPack) {
    this.ID = initPack.ID;
    this.name = initPack.name;
    this.gridX = initPack.gridX;
    this.gridY = initPack.gridY;
    this.x = initPack.x;
    this.y = initPack.y;
    this.HP = initPack.HP;
    this.mX = initPack.mX;
    this.mY = initPack.mY;
    this.maxHP = initPack.maxHP;
    this.score = initPack.score;
    this.ammo = initPack.ammo;
    this.maxAmmo = initPack.maxAmmo;
    this.clips = initPack.clips;
    this.maxClips = initPack.clips;
    this.invincible = initPack.invincible;
    this.mode = initPack.mode;
    this.blocks = initPack.blocks;
    this.maxBlocks = initPack.maxBlocks;
  } //cPlayer.constructor

  drawSelf(ctx, xView, yView, isLocalPlayer) {
    let x = this.x - xView;
    let y = this.y - yView;

    //Health bar
    let HPWidth = 30 * this.HP / this.maxHP;
    ctx.fillStyle = 'red';
    ctx.fillRect(x - HPWidth/1.4, y + 22, HPWidth*1.4, 4);

    //Player
    //User feedback for respawn invincibility
    if( this.invincible === true ) {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    } else {
      ctx.strokeStyle = 'black'; //#TODO: This will change to team color later
      ctx.fillStyle = 'black';
    }

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();

    if( this.mode === 0 ) { //If player is in weapon mode
      //Gun
      let targetX = this.mX - ctx.canvas.width*0.5;
      let targetY = this.mY - ctx.canvas.height*0.5;

      //Check if within the deadzones
      if( isLocalPlayer === true && xView === 0 ) {     //LEFT
        //Local player is inside of left deadzone
        targetX = this.mX - this.x;
      }
      if( isLocalPlayer !== true && this.x < ctx.canvas.width*0.5 ) {
        //Other player is inside of left deadzone
        targetX = this.mX - this.x;
      }

      if( isLocalPlayer === true && xView === (GLOBALS.WORLD_WIDTH - ctx.canvas.width) ) {  //RIGHT
        //Local player is inside of right deadzone
        targetX = this.mX - x;
      }
      if( isLocalPlayer !== true && this.x > (GLOBALS.WORLD_WIDTH - ctx.canvas.width*0.5) ) {
        //Other player is inside of right deadzone
        targetX = this.mX - (this.x - (GLOBALS.WORLD_WIDTH - ctx.canvas.width));
      } 

      if( isLocalPlayer === true && yView === 0 ) {     //TOP
        //Local player is inside of top deadzone
        targetY = this.mY - this.y;
      }
      if( isLocalPlayer !== true && this.y < ctx.canvas.height*0.5 ) {
        //Other player is inside of top deadzone
        targetY = this.mY - this.y;
      }

      if( isLocalPlayer === true && yView === (GLOBALS.WORLD_HEIGHT - ctx.canvas.height) ) {  //BOTTOM
        //Local player is inside of bottom deadzone
        targetY = this.mY - y;
      }
      if( isLocalPlayer !== true && this.y > (GLOBALS.WORLD_HEIGHT - ctx.canvas.height*0.5) ) {
        //Other player is inside of bottom deadzone
        targetY = this.mY - (this.y - (GLOBALS.WORLD_HEIGHT - ctx.canvas.height));
      }

      let theta = Math.atan2(targetY, targetX);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(theta);
      ctx.translate(30, 0); //Move the gun to the outside of the player
      if( this.invincible === true ) {
        ctx.fillStyle = 'rgba(65, 135, 255, 0.5)';
      } else {
        ctx.fillStyle = 'rgba(65, 135, 255, 1)';
      }
      ctx.fillRect(19/2 * -1, 8/2 * -1, 19, 8);
      ctx.restore();
    }
  } //cPlayer.drawSelf()

  drawName(ctx, xView, yView) {
    let x = this.x - xView;
    let y = this.y - yView;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(this.name, x - this.name.length * 2.5, y);
  } //cPlayer.drawName()

  drawAmmo(ctx, xView, yView) {
    let x = this.x - xView;
    let y = this.y - yView;

    let ammoString = `${this.ammo}/${this.maxAmmo}`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(ammoString, x - 8, y + 16);
  } //cPlayer.drawAmmo()
} //class cPlayer

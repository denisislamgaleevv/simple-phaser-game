 
import mainScene from './mainScene.js'
const config = {
    type: Phaser.AUTO, 
    width: 800, 
    height: 600, 
    parent: 'game', 
    physics:{
        default: 'arcade', 
        arcade:{
            gravity: {y:300}, 
            debug: true
        }
    }, 
    scene:[mainScene]
}
new Phaser.Game(config);



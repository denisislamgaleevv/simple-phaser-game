export default class mainScene extends Phaser.Scene {
    constructor(){
        super('mainScene');
        this.ground;
        this.platforms;
        this.cursor;
        this.player;
        this.enemyDirection = 'right';
    }

    preload(){
        this.load.image('sky', '../../assets/sky.png');
        this.load.image('ground', '../../assets/ground.png');
        this.load.image('platform', '../../assets/platform.png');

        this.load.spritesheet('player', '../../assets/player/player.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('enemy', '../../assets/enemy/enemy.png', {frameWidth: 32, frameHeight: 32});
    }

    create(){
        this.add.image(450, 300, 'sky');

        this.ground = this.physics.add.staticGroup();
        this.ground.create(450, 491, 'ground');
        this.ground.create(450, 92, 'ground');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(200, 355.6, 'platform');
        this.platforms.create(600, 355.6, 'platform');
        

        this.player = this.physics.add.sprite(100, 300, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        this.cursor = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.ground);

        
        this.enemy = this.physics.add.sprite(500, 300, 'enemy');
        this.enemy.setCollideWorldBounds(true);
        this.enemy.setBounce(0.2);
        this.physics.add.collider(this.enemy, this.platforms);
        this.physics.add.collider(this.enemy, this.ground);

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1 
        });
        this.anims.create({
            key: 'runEnemy',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1 
        });
    }

    update(){
        if (this.cursor.left.isDown){
            this.player.setVelocityX(-160);
            this.player.anims.play('run', true); // Воспроизведение анимации бега
            this.player.flipX = true; // Разворот спрайта влево
        }
        else if (this.cursor.right.isDown){
            this.player.setVelocityX(160);
            this.player.anims.play('run', true); // Воспроизведение анимации бега
            this.player.flipX = false; // Разворот спрайта вправо
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.stop('run'); // Остановка анимации бега
            this.player.setTexture('player', 0); // Установка статичного кадра персонажа
        }

        if (this.cursor.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-290);
        }

        
       // Движение врага вправо-влево
        if (this.enemyDirection === 'right') {
            this.enemy.setVelocityX(80);
            this.enemy.flipX = false;
            this.enemy.anims.play('runEnemy', true);
        } else if (this.enemyDirection === 'left') {
            this.enemy.setVelocityX(-80);
            this.enemy.flipX = true;
            this.enemy.anims.play('runEnemy', true);
        }

        // Изменение направления врага при достижении границы
        if (this.enemy.body.blocked.right) {
            this.enemyDirection = 'left';
        } else if (this.enemy.body.blocked.left) {
            this.enemyDirection = 'right';
        }
    }
}

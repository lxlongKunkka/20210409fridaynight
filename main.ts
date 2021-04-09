namespace SpriteKind {
    export const Camera = SpriteKind.create()
}
// 删除精灵们
function ClearGame () {
	
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        hero.vy = -4 * Pixels_to_Meter
        hero.startEffect(effects.trail, 500)
        scene.cameraShake(2, 200)
    }
})
// 1, 销毁上一个地图的精灵们
// 2, 生成新的地图
// 3, 生成这个地图的精灵们
function GenerateMap () {
    ClearGame()
    if (Level == 1) {
        tiles.setTilemap(tilemap`级别1`)
    } else if (Level == 2) {
        tiles.setTilemap(tilemap`级别2`)
    } else if (Level == 3) {
        tiles.setTilemap(tilemap`级别3`)
    }
    InitGame()
}
function CreateHero () {
    hero = sprites.create(img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `, SpriteKind.Player)
    shadow = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Camera)
    info.setScore(0)
    info.setLife(6)
    controller.moveSprite(hero, 100, 0)
    hero.ay = Gravity
    scene.cameraFollowSprite(shadow)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy(effects.rings, 500)
})
// 生成精灵们
function InitGame () {
    for (let 值 of tiles.getTilesByType(assets.tile`myTile`)) {
        tiles.placeOnTile(hero, 值)
        tiles.setTileAt(值, assets.tile`transparency16`)
    }
    for (let 值 of tiles.getTilesByType(sprites.castle.tilePath2)) {
        tiles.setWallAt(值, true)
    }
    for (let 值 of tiles.getTilesByType(sprites.castle.tilePath5)) {
        tiles.setWallAt(值, true)
    }
    for (let 值 of tiles.getTilesByType(assets.tile`myTile0`)) {
        fruits = sprites.create(img`
            . . . . 6 6 . . . 6 
            . . . 8 8 6 6 . 6 7 
            . 2 2 2 e 8 6 6 7 6 
            . 4 4 2 7 7 7 7 7 8 
            . 4 2 6 7 7 7 6 7 6 
            5 2 2 6 7 7 6 2 7 7 
            4 2 2 6 7 6 2 2 6 7 
            2 2 2 6 6 2 2 2 e 7 
            2 2 4 2 2 2 4 2 . . 
            2 2 2 2 . . . . . . 
            `, SpriteKind.Food)
        tiles.placeOnTile(fruits, 值)
        tiles.setTileAt(值, assets.tile`transparency16`)
    }
}
let fruits: Sprite = null
let shadow: Sprite = null
let hero: Sprite = null
let Gravity = 0
let Pixels_to_Meter = 0
let Level = 0
scene.setBackgroundColor(9)
// 当前是第一关
Level = 1
// 总共有3关
let LevelCount = 3
Pixels_to_Meter = 32
Gravity = 9.8 * Pixels_to_Meter
CreateHero()
GenerateMap()
game.onUpdate(function () {
    shadow.x = hero.x + 30
    shadow.y = hero.y
})

- Transforms
- Transitions
- keyframes
- Animation Basics

# Transforms

- transform: some-function()

ex:
    transform: translate(200px, 300px)
    transform: translateX(200px)
    transform: translateY(200px)

    scaleX(3)  --> scales 3 times of original with x axis
    scaleY(2)  --> --> scales 2 times of original
    scale(0.5, 1)

    rotateX(60deg)
    rotateY(120deg)
    rotateZ(120DEG) -- +VE - CLOCKWISE, -VE - ANTICLOCKWISE
    rotate(12deg)

    USING MULTIPLE FNS TOGETHER
    transform: rotateZ(-90deg) translateY(200PX) scale(2)

# Transition

Transition element from one state to another over a specific period of time.

transition: 1s ;

transition: background 1s, transform 0.3s 1s ; ---> delay

transition: background 1s, transform 0.3s 1s linear/ease-in ease-out ; ---> delay

# Keyframes


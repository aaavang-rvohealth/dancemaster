const BEATS = 500

let count = 0
let headerText
let freezeHeader = false

let mingling = false

const updateHeader = (text) => {
    if (text && !freezeHeader) {
        headerText = text
    }
    const header = document.getElementById('header')
    header.innerHTML = `${headerText} - ${(count % 8) + 1}`
}

const clearHeader = () => {
    const header = document.getElementById('header')
    header.innerHTML = ''
}

const tick = () => {
    count++;
    updateHeader();
}

/**
 * Helper enum for formations
 * @typedef {keyof Formations} Formation
 */
const Formations = {
    EIGHT_HAND_SQUARE: 'EIGHT_HAND_SQUARE',
    TWO_FACING_TWO: 'TWO_FACING_TWO',
    // SOLO: 'SOLO',
    THREE_FACING_THREE: 'THREE_FACING_THREE',
    // FOUR_FACING_FOUR: 'FOUR_FACING_FOUR',
    // CIRCLE: 'CIRCLE',
}

/**
 * Helper enum for orientations
 * @typedef {keyof Orientations} Orientation
 */
const Orientations = {
    TOPS: 'TOPS',
    SIDES: 'SIDES',
    OTHER: 'OTHER'
}

/**
 * Helper enum for relationships
 * @typedef {keyof Relationships} Relationship
 */
const Relationships = {
    PARTNER: 'PARTNER',
    CORNER: 'CORNER',
    OPPOSITE: 'OPPOSITE',
    CONTRARY: 'CONTRARY'
}

/**
 * Helper enum for positions
 * @typedef {keyof Positions} Position
 */
const Positions = {
    FIRST_TOP_LEAD: 'first-top-lead',
    FIRST_TOP_FOLLOW: 'first-top-follow',
    SECOND_TOP_LEAD: 'second-top-lead',
    SECOND_TOP_FOLLOW: 'second-top-follow',
    FIRST_SIDE_LEAD: 'first-side-lead',
    FIRST_SIDE_FOLLOW: 'first-side-follow',
    SECOND_SIDE_LEAD: 'second-side-lead',
    SECOND_SIDE_FOLLOW: 'second-side-follow',
    TOP_CENTER: 'top-center',
    TOP_LEFT: 'top-left',
    TOP_RIGHT: 'top-right',
    BOTTOM_CENTER: 'bottom-center',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_RIGHT: 'bottom-right',
    OUT_OF_POSITION: 'out-of-position'
}

/**
 * Helper enum for positions
 * @typedef {keyof DancerLayouts} DancerLayout
 */
const DancerLayouts = {
    [Formations.EIGHT_HAND_SQUARE]: [
        Positions.FIRST_TOP_LEAD,
        Positions.FIRST_TOP_FOLLOW,
        Positions.SECOND_SIDE_LEAD,
        Positions.SECOND_SIDE_FOLLOW,
        Positions.SECOND_TOP_LEAD,
        Positions.SECOND_TOP_FOLLOW,
        Positions.FIRST_SIDE_LEAD,
        Positions.FIRST_SIDE_FOLLOW
    ],
    [Formations.TWO_FACING_TWO]: [
        Positions.FIRST_TOP_LEAD,
        Positions.FIRST_TOP_FOLLOW,
        Positions.SECOND_TOP_LEAD,
        Positions.SECOND_TOP_FOLLOW
    ],
    [Formations.THREE_FACING_THREE]: [
        Positions.TOP_LEFT,
        Positions.TOP_CENTER,
        Positions.TOP_RIGHT,
        Positions.BOTTOM_LEFT,
        Positions.BOTTOM_CENTER,
        Positions.BOTTOM_RIGHT
    ],
}

const Group = {
    TOP: 'TOP',
    BOTTOM: 'BOTTOM',
    FIRST_TOP: '1st TOP',
    SECOND_TOP: '2nd TOP',
    FIRST_SIDE: '1st SIDE',
    SECOND_SIDE: '2nd SIDE'
}

const isTopGroup = (group) => {
    return group === Group.TOP || group === Group.FIRST_TOP || group === Group.SECOND_TOP
}

const isSideGroup = (group) => {
    return group === Group.FIRST_SIDE || group === Group.SECOND_SIDE;
}

/**
 * Helper enum for formation groups
 * @typedef {keyof FormationGroups} Group
 */
const FormationGroups = {
    [Formations.EIGHT_HAND_SQUARE]: {
        [Positions.FIRST_TOP_LEAD]: 'TOP',
        [Positions.FIRST_TOP_FOLLOW]: 'TOP',
        [Positions.SECOND_TOP_LEAD]: 'BOTTOM',
        [Positions.SECOND_TOP_FOLLOW]: 'BOTTOM',
        [Positions.FIRST_SIDE_LEAD]: '1st SIDE',
        [Positions.FIRST_SIDE_FOLLOW]: '1st SIDE',
        [Positions.SECOND_SIDE_LEAD]: '2nd SIDE',
        [Positions.SECOND_SIDE_FOLLOW]: '2nd SIDE',
    },
    [Formations.TWO_FACING_TWO]: {
        [Positions.FIRST_TOP_LEAD]: 'TOP',
        [Positions.FIRST_TOP_FOLLOW]: 'TOP',
        [Positions.SECOND_TOP_LEAD]: 'BOTTOM',
        [Positions.SECOND_TOP_FOLLOW]: 'BOTTOM',
    },
    [Formations.THREE_FACING_THREE]: {
        [Positions.TOP_LEFT]: 'TOP',
        [Positions.TOP_CENTER]: 'TOP',
        [Positions.TOP_RIGHT]: 'TOP',
        [Positions.BOTTOM_LEFT]: 'BOTTOM',
        [Positions.BOTTOM_CENTER]: 'BOTTOM',
        [Positions.BOTTOM_RIGHT]: 'BOTTOM',
    },
    // [Formations.SOLO]: {
    //     [Positions.FIRST_TOP_LEAD]: 'TOP',
    // }
}

/**
 * Helper enum for directions
 * @typedef {keyof Directions} Direction
 */
const Directions = {
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
    UP: 'UP',
    DOWN: 'DOWN'
}

/**
 * Get the positions of the dancers in the formation given the width and height of the dance floor
 * @param width
 * @param height
 * @returns {{center: {x: number, y: number}, [Formations.EIGHT_HAND_SQUARE]: {[Positions.SECOND_TOP_FOLLOW]: {rotation: number, x: number, y: number}, [Positions.FIRST_SIDE_LEAD]: {rotation: number, x: number, y: number}, [Positions.SECOND_SIDE_LEAD]: {rotation: number, x: number, y: number}, [Positions.SECOND_TOP_LEAD]: {rotation: number, x: number, y: number}, [Positions.FIRST_TOP_LEAD]: {rotation: number, x: number, y: number}, [Positions.FIRST_TOP_FOLLOW]: {rotation: number, x: number, y: number}, [Positions.FIRST_SIDE_FOLLOW]: {rotation: number, x: number, y: number}, [Positions.SECOND_SIDE_FOLLOW]: {rotation: number, x: number, y: number}}}}
 */
const calcPositions = (width, height) => {
    const center = {
        x: width / 2,
        y: height / 2 + 100
    }

    return {
        center,
        [Formations.EIGHT_HAND_SQUARE]: {
            [Positions.FIRST_TOP_FOLLOW]: {
                x: center.x - 125,
                y: center.y - 250,
                rotation: 0
            },
            [Positions.FIRST_TOP_LEAD]: {
                x: center.x + 25,
                y: center.y - 250,
                rotation: 0
            },
            [Positions.SECOND_TOP_FOLLOW]: {
                x: center.x + 25,
                y: center.y + 150,
                rotation: 180
            },
            [Positions.SECOND_TOP_LEAD]: {
                x: center.x - 125,
                y: center.y + 150,
                rotation: 180
            },
            [Positions.FIRST_SIDE_LEAD]: {
                x: center.x + 150,
                y: center.y + 25,
                rotation: 90
            },
            [Positions.FIRST_SIDE_FOLLOW]: {
                x: center.x + 150,
                y: center.y - 125,
                rotation: 90
            },
            [Positions.SECOND_SIDE_LEAD]: {
                x: center.x - 250,
                y: center.y - 125,
                rotation: 270
            },
            [Positions.SECOND_SIDE_FOLLOW]: {
                x: center.x - 250,
                y: center.y + 25,
                rotation: 270
            },
        },
        [Formations.TWO_FACING_TWO]: {
            [Positions.FIRST_TOP_FOLLOW]: {
                x: center.x - 125,
                y: center.y - 150,
                rotation: 0
            },
            [Positions.FIRST_TOP_LEAD]: {
                x: center.x + 25,
                y: center.y - 150,
                rotation: 0
            },
            [Positions.SECOND_TOP_FOLLOW]: {
                x: center.x + 25,
                y: center.y + 50,
                rotation: 180
            },
            [Positions.SECOND_TOP_LEAD]: {
                x: center.x - 125,
                y: center.y + 50,
                rotation: 180
            },
        },
        // [Formations.SOLO]: {
        //     [Positions.FIRST_TOP_LEAD]: {
        //         x: center.x,
        //         y: center.y + 50,
        //         rotation: 180
        //     }
        // }
    }
}

let positions = calcPositions(window.innerWidth, window.innerHeight)

/**
 * Get the offset of the dancer from their starting position
 * @param formation
 * @param dancer
 * @returns {{x: number, y: number}}
 */
const getCurrentOffset = (formation, dancer) => {
    const startingPosition = positions[formation][dancer.role]
    const currentPosition = positions[formation][dancer.currentNamedPosition]

    return {
        x: currentPosition.x - startingPosition.x,
        y: currentPosition.y - startingPosition.y
    }
}

/**
 * Move to fast sevens with partner
 * @param danceMaster
 * @param numBeats
 * @returns {Promise<Awaited<unknown>[]>}
 */
const switchWithPartner = async (danceMaster, numBeats = 4) => {
    const state = danceMaster.state
    updateHeader('Switch With Partner')
    const timelines = [];
    switch (state.formation) {
        case Formations.TWO_FACING_TWO:
        case Formations.EIGHT_HAND_SQUARE:
            // group dancers by group
            const groups = Object.values(state.dancers).reduce((acc, dancer) => {
                const group = FormationGroups[state.formation][dancer.currentNamedPosition]
                if (!acc[group]) {
                    acc[group] = []
                }
                acc[group].push(dancer)
                return acc
            }, {})

            Object.values(groups).forEach(group => {
                const [dancer1, dancer2] = group
                const dancer1Timeline = anime.timeline({
                    duration: numBeats * BEATS,
                    easing: 'linear',
                    autoplay: false
                })
                const dancer2Timeline = anime.timeline({
                    duration: numBeats * BEATS,
                    easing: 'linear',
                    autoplay: false
                })

                const dancer1DesiredPosition = positions[state.formation][dancer2.currentNamedPosition]
                const dancer2DesiredPosition = positions[state.formation][dancer1.currentNamedPosition]
                const dancer1StartingPosition = positions[state.formation][dancer1.role]
                const dancer2StartingPosition = positions[state.formation][dancer2.role]

                dancer1Timeline.add({
                    // switch with partner
                    targets: dancer1.targetId,
                    translateX: dancer1DesiredPosition.x - dancer1StartingPosition.x,
                    translateY: dancer1DesiredPosition.y - dancer1StartingPosition.y,
                    complete: () => {
                        const tempNamedPosition = dancer1.currentNamedPosition
                        const tempPosition = {...dancer1.position}
                        dancer1.currentNamedPosition = dancer2.currentNamedPosition
                        dancer1.position = dancer2.position
                        dancer2.currentNamedPosition = tempNamedPosition
                        dancer2.position = tempPosition
                    }
                })

                dancer2Timeline.add({
                    // switch with partner
                    targets: dancer2.targetId,
                    translateX: dancer2DesiredPosition.x - dancer2StartingPosition.x,
                    translateY: dancer2DesiredPosition.y - dancer2StartingPosition.y
                })

                timelines.push(dancer1Timeline)
                timelines.push(dancer2Timeline)

            })
            break;
        default:
            throw new Error("invalid formation")
    }
    const tickerTimeline = makeTickerTimeline(numBeats);
    timelines.push(tickerTimeline)

    timelines.forEach(timeline => timeline.play())
    return Promise.all(timelines.map(timeline => timeline.finished))
}

/**
 * Move to fast sevens with partner
 * @param danceMaster
 * @returns {Promise<Awaited<unknown>[]>}
 */
const fastSevensWithPartner = async (danceMaster) => {
    updateHeader('Fast Sevens')
    freezeHeader = true
    await switchWithPartner(danceMaster)
    await switchWithPartner(danceMaster)
    freezeHeader = false

}

/**
 * Move to advance and retire
 * @param danceMaster
 * @returns {Promise<Awaited<unknown>[]>}
 */
const advanceAndRetire = async (danceMaster) => {
    const state = danceMaster.state
    updateHeader('Advance and Retire')
    const timelines = [];
    switch (state.formation) {
        case Formations.TWO_FACING_TWO:
        case Formations.EIGHT_HAND_SQUARE:
            for (const dancer of Object.values(state.dancers)) {
                const timeline = anime.timeline({
                    duration: 4 * BEATS,
                    easing: 'linear',
                    autoplay: false
                })

                const startingPosition = positions[state.formation][dancer.role]
                const currentPosition = positions[state.formation][dancer.currentNamedPosition]
                const startingOffsetX = currentPosition.x - startingPosition.x
                const startingOffsetY = currentPosition.y - startingPosition.y


                let translateX = startingOffsetX
                let translateY = startingOffsetY

                switch (dancer.currentNamedPosition) {
                    case Positions.FIRST_TOP_LEAD:
                    case Positions.FIRST_TOP_FOLLOW:
                        translateY += 50
                        break;
                    case Positions.SECOND_TOP_LEAD:
                    case Positions.SECOND_TOP_FOLLOW:
                        translateY -= 50
                        break;
                    case Positions.FIRST_SIDE_LEAD:
                    case Positions.FIRST_SIDE_FOLLOW:
                        translateX -= 50
                        break;
                    case Positions.SECOND_SIDE_LEAD:
                    case Positions.SECOND_SIDE_FOLLOW:
                        translateX += 50
                        break;
                }

                timeline.add({
                    targets: dancer.targetId,
                    translateX,
                    translateY,
                }).add({
                    targets: dancer.targetId,
                    translateX: startingOffsetX,
                    translateY: startingOffsetY,
                })

                timelines.push(timeline)
            }
            break;
        default:
            throw new Error("invalid formation")
    }
    const tickerTimeline = makeTickerTimeline(8);
    timelines.push(tickerTimeline)

    timelines.forEach(timeline => timeline.play())
    return Promise.all(timelines.map(timeline => timeline.finished))
}

/**
 * Calculate the angle and rotation needed to face a specific position from a given starting position, while turning in
 * the given direction.
 * @param state
 * @param {number} startingRotation
 * @param {Position} startingPosition
 * @param {Position} targetPosition
 * @param {Direction} direction
 * @param dancer
 * @returns {{angle: number, rotation: number}}
 */
function calculateAngleAndRotation(state, startingRotation, startingPosition, targetPosition, direction, dancer) {
    let targetAngle = calculateRotationToFacePosition(state, startingPosition, targetPosition, direction, dancer);
    let dancerAngle = startingRotation

    if(targetAngle === 360 && dancerAngle < 0 && dancerAngle > -180 && direction === Directions.RIGHT) {
        targetAngle = 0
    }
    if(targetAngle === 360 && dancerAngle < 180 && dancerAngle > -360 && direction === Directions.LEFT) {
        targetAngle = -360
    }

    if (targetAngle < dancerAngle && direction === Directions.RIGHT) {
        targetAngle += 360
    }
    if (dancerAngle < targetAngle && direction === Directions.LEFT) {
        dancerAngle += 360
    }

    let difference = targetAngle - dancerAngle
    if(difference < 0 && direction === Directions.RIGHT) {
        difference += 360
    }

    return {
        angle: targetAngle,
        rotation: startingRotation + difference
    };
}

/**
 * Helper function to calculate the rotation of the dancer when moving to a new position
 * @param state
 * @param dancer
 * @param nextPositionName
 * @param direction
 * @returns {number|*}
 */
function calculateRotation(state, dancer, nextPositionName, direction) {
    const currentRotation = dancer.currentOffset.rotation
    const nextRotation = positions[state.formation][nextPositionName].rotation
    let difference = Math.abs(nextRotation - currentRotation) % 360
    if (difference > 180) {
        difference = 360 - difference
    }
    return direction === Directions.RIGHT ? currentRotation - difference : currentRotation + difference;
}

function calculateRotationToFacePosition(state, startingPositionName, targetPositionName, direction, dancer) {
    const dancerTransform = getDancerTransformValues(dancer)
    const startingPosition = startingPositionName === Positions.OUT_OF_POSITION ? {
        x: dancerTransform.x + positions[state.formation][dancer.role].x,
        y: dancerTransform.y + positions[state.formation][dancer.role].y
    } : positions[state.formation][startingPositionName]
    const targetPosition = positions[state.formation][targetPositionName]

    return calculateRotationFromPositions(state, startingPosition, targetPosition, direction)
}

function calculateRotationFromPositions(state, startingPosition, targetPosition, direction) {
    let angle = ((Math.atan2(targetPosition.y - startingPosition.y, targetPosition.x - startingPosition.x) * 180) / Math.PI) + 270;
    angle = angle % 360
    if (angle === 0 && direction === Directions.RIGHT) {
        angle = 360
    }

    return angle
}

function findShortestRotation(rotationRight, dancer, rotationLeft, overrideTurnDirection) {
    const differenceRight = Math.abs(rotationRight.rotation - dancer.currentOffset.rotation) % 360
    const differenceLeft = Math.abs(rotationLeft.rotation - dancer.currentOffset.rotation) % 360

    let rotation
    if (differenceLeft < differenceRight) {
        rotation = rotationLeft.rotation
    } else {
        rotation = rotationRight.rotation
    }

    if (overrideTurnDirection === Directions.RIGHT) {
        rotation = rotationRight.rotation
    } else if (overrideTurnDirection === Directions.LEFT) {
        rotation = rotationLeft.rotation
    }
    return rotation;
}

function calculateShortestTurnRotation(dancer, targetPositionName, state, overrideTurnDirection) {
    const rotationRight = calculateAngleAndRotation(state, dancer.currentOffset.rotation, dancer.currentNamedPosition, targetPositionName, Directions.RIGHT, dancer)
    const rotationLeft = calculateAngleAndRotation(state, dancer.currentOffset.rotation, dancer.currentNamedPosition, targetPositionName, Directions.LEFT, dancer)

    return findShortestRotation(rotationRight, dancer, rotationLeft, overrideTurnDirection);
}

/**
 * Helper move to face partner.  Can be done in conjunction with other moves, so you can disable ticks
 * @param danceMaster
 * @param tick
 * @param overrideTurnDirection
 * @returns {Promise<Awaited<unknown>[]>}
 */
const facePartner = async (danceMaster, tick = false, overrideTurnDirection) => {
    updateHeader('Face Partner')
    const state = danceMaster.state
    const timelines = [];
    switch (state.formation) {
        case Formations.TWO_FACING_TWO:
        case Formations.EIGHT_HAND_SQUARE:
            for (const dancer of Object.values(state.dancers)) {

                const partnerPositionName = danceMaster.getPositionNameFromRelationship(dancer.currentNamedPosition, Relationships.PARTNER)
                const rotation = calculateShortestTurnRotation(dancer, partnerPositionName, state, overrideTurnDirection);
                if( rotation % 360 === dancer.currentOffset.rotation % 360) {
                    // no rotation needed
                    continue;
                }

                const arrowTimeline = anime.timeline({
                    duration: 2 * BEATS,
                    easing: 'linear',
                    autoplay: false
                })

                arrowTimeline.add({
                    targets: dancer.arrowId,
                    rotate: rotation,
                    complete: () => {
                        dancer.currentOffset.rotation = rotation
                        dancer.facingPartner = true
                    }
                })

                timelines.push(arrowTimeline)
            }
            break;
        default:
            throw new Error("invalid formation")
    }
    if (tick) {
        const tickerTimeline = makeTickerTimeline(2);
        timelines.push(tickerTimeline)
    }

    timelines.forEach(timeline => timeline.play())
    return Promise.all(timelines.map(timeline => timeline.finished))
}

/**
 * Helper move to face the center.  Can be done in conjunction with other moves, so you can disable ticks.
 * @param danceMaster
 * @param tick
 * @param overrideTurnDirection
 * @returns {Promise<Awaited<unknown>[]>}
 */
const faceCenter = async (danceMaster, tick = false, overrideTurnDirection) => {
    updateHeader('Face Center')
    const state = danceMaster.state
    const timelines = [];
    switch (state.formation) {
        // case Formations.SOLO:
        case Formations.TWO_FACING_TWO:
        case Formations.EIGHT_HAND_SQUARE:
            for (const dancer of Object.values(state.dancers)) {
                const opposite = danceMaster.getPositionNameFromRelationship(dancer.currentNamedPosition, Relationships.OPPOSITE)
                const rotation = calculateShortestTurnRotation(dancer, opposite, state, overrideTurnDirection);

                if( rotation % 360 === dancer.currentOffset.rotation % 360) {
                    // no rotation required, skip
                    continue
                }

                const arrowTimeline = anime.timeline({
                    duration: 2 * BEATS,
                    easing: 'linear',
                    autoplay: false
                })

                arrowTimeline.add({
                    targets: dancer.arrowId,
                    rotate: rotation,
                    complete: () => {
                        dancer.currentOffset.rotation = rotation
                        dancer.facingPartner = false
                    }
                })

                timelines.push(arrowTimeline)
            }
            break;
        default:
            throw new Error("invalid formation")
    }
    if (tick) {
        const tickerTimeline = makeTickerTimeline(2);
        timelines.push(tickerTimeline)
    }

    timelines.forEach(timeline => timeline.play())
    return Promise.all(timelines.map(timeline => timeline.finished))
}

function makeTickerTimeline(numOfBeats) {
    const tickerTimeline = anime.timeline({
        duration: BEATS,
        easing: 'linear',
        autoplay: false,
    })

    for (let i = 0; i < numOfBeats; i++) {
        tickerTimeline.add({
            complete: () => {
                tick();
            }
        })
    }
    return tickerTimeline;
}

/**
 * Helper function to get the position of the inner circle
 * @param formation
 * @param position
 * @returns {{x: number, y}|{x, y: number}|{x, y: *}|{x: *, y}}
 */
const getInnerCirclePosition = (formation, position) => {
    const normalPosition = positions[formation][position]
    const group = FormationGroups[formation][position]
    const offset = 100;
    switch (group) {
        case 'TOP':
            return {
                x: normalPosition.x,
                y: normalPosition.y + offset
            }
        case 'BOTTOM':
            return {
                x: normalPosition.x,
                y: normalPosition.y - offset
            }
        case '1st SIDE':
            return {
                x: normalPosition.x - offset,
                y: normalPosition.y
            }
        case '2nd SIDE':
            return {
                x: normalPosition.x + offset,
                y: normalPosition.y
            }
    }
}

const sound = new Audio('clap.mp3');
sound.preload = 'auto'
const clapTwice = async (danceMaster) => {
    updateHeader('Clap Twice')
    const state = danceMaster.state
    const timelines = []

    const tickerTimeline = makeTickerTimeline(2);
    timelines.push(tickerTimeline)

    const clapTimeline = anime.timeline({
        duration: 1 * BEATS,
        autoplay: false
    })

    clapTimeline.add({
        begin: () => {
            sound.play()
        }
    })

    clapTimeline.add({
        begin: () => {
            sound.play()
        }
    })

    timelines.push(clapTimeline)

    for (const dancer of Object.values(state.dancers)) {
        // scale element up and down
        const dancerTimeline = anime.timeline({
            duration: .25 * BEATS,
            autoplay: false
        })

        dancerTimeline.add({
            targets: dancer.targetId,
            scale: 1.2,
            direction: 'alternate',
            easing: 'easeOutElastic(1, .6)'
        })

        dancerTimeline.add({
            targets: dancer.targetId,
            scale: 1,
            direction: 'alternate',
            easing: 'easeOutElastic(1, .6)'
        })

        dancerTimeline.add({
            targets: dancer.targetId,
            direction: 'alternate',
            easing: 'easeOutElastic(1, .6)'
        })

        dancerTimeline.add({
            targets: dancer.targetId,
            direction: 'alternate',
            easing: 'easeOutElastic(1, .6)'
        })

        dancerTimeline.add({
            targets: dancer.targetId,
            scale: 1.2,
            direction: 'alternate',
            easing: 'easeOutElastic(1, .6)'
        })

        dancerTimeline.add({
            targets: dancer.targetId,
            scale: 1,
            direction: 'alternate',
            easing: 'easeOutElastic(1, .6)'
        })

        dancerTimeline.add({
            targets: dancer.targetId,
            direction: 'alternate',
            easing: 'easeOutElastic(1, .6)'
        })

        dancerTimeline.add({
            targets: dancer.targetId,
            direction: 'alternate',
            easing: 'easeOutElastic(1, .6)'
        })
        timelines.push(dancerTimeline)
    }

    timelines.forEach(timeline => timeline.play())
    return Promise.all(timelines.map(timeline => timeline.finished))
}

/**
 * Helper move to make an inner circle and rotate a quarter position
 * @param danceMaster
 * @param direction
 * @param {boolean} leadsActive - true if the leads are moving, false if the follows are moving
 * @param {boolean} endInRegularPosition - true if the dancers should end in their regular position, false if they should end in the opposite role position
 * @returns {Promise<void>}
 */
const innerQuarterCircle = async (danceMaster, direction, leadsActive, endInRegularPosition, numBeats = 4) => {
    updateHeader(`Inner Quarter Circle ${direction} - ${leadsActive ? 'Leads' : 'Follows'}`)
    const state = danceMaster.state
    const timelines = [];

    switch (state.formation) {
        case Formations.EIGHT_HAND_SQUARE:
            for (const dancer of Object.values(state.dancers)) {
                const positionIndex = DancerLayouts[state.formation].indexOf(dancer.currentNamedPosition)

                if (leadsActive && positionIndex % 2 === 1) {
                    // if leads are active, skip the follows
                    continue
                } else if (!leadsActive && positionIndex % 2 === 0) {
                    // if follows are active, skip the leads
                    continue
                }

                const timeline = anime.timeline({
                    targets: dancer.targetId,
                    duration: numBeats * BEATS,
                    easing: 'linear',
                    autoplay: false
                })

                let modifiedDirection = direction
                if (dancer.turnedAround) {
                    // invert the direction if the dancer is turned around
                    modifiedDirection = direction === Directions.RIGHT ? Directions.LEFT : Directions.RIGHT
                }

                const nextPositionName = danceMaster.getNextPositionNameOfSameRole(modifiedDirection, dancer.currentNamedPosition)
                const homePosition = positions[state.formation][dancer.role]
                const nextPosition = endInRegularPosition ? positions[state.formation][nextPositionName] : getInnerCirclePosition(state.formation, nextPositionName)

                const translateX = nextPosition.x - homePosition.x
                const translateY = nextPosition.y - homePosition.y


                timeline.add({
                    translateX,
                    translateY,
                    complete: () => {
                        dancer.currentNamedPosition = nextPositionName
                    }
                })

                timelines.push(timeline)

                const arrowTimeline = anime.timeline({
                    duration: numBeats * BEATS,
                    easing: 'linear',
                    autoplay: false
                })

                const newRotation = calculateRotation(state, dancer, nextPositionName, modifiedDirection);

                arrowTimeline.add({
                    targets: dancer.arrowId,
                    rotate: newRotation,
                    complete: () => {
                        dancer.currentOffset.rotation = newRotation
                    }
                })

                timelines.push(arrowTimeline)
            }
            break;
        default:
            throw new Error("invalid formation")
    }
    const tickerTimeline = makeTickerTimeline(numBeats);
    timelines.push(tickerTimeline)

    timelines.forEach(timeline => timeline.play())
    return Promise.all(timelines.map(timeline => timeline.finished))
}

/**
 * Helper move to do a quarter circle in a specific direction
 * @param danceMaster
 * @param direction
 * @returns {Promise<Awaited<unknown>[]>}
 */
const quarterCircle = async (danceMaster, direction) => {
    updateHeader("Quarter Circle " + direction)
    const state = danceMaster.state
    const timelines = [];

    switch (state.formation) {
        case Formations.EIGHT_HAND_SQUARE:
            for (const dancer of Object.values(state.dancers)) {
                const timeline = anime.timeline({
                    targets: dancer.targetId,
                    duration: 2 * BEATS,
                    easing: 'linear',
                    autoplay: false
                })


                const nextPositionName = danceMaster.getNextPositionNameOfSameRole(direction, dancer.currentNamedPosition)
                const intermediateNextPositionName = danceMaster.getNextPosition(direction, dancer.currentNamedPosition)
                const homePosition = positions[state.formation][dancer.role]
                const intermediateNextPosition = positions[state.formation][intermediateNextPositionName]
                const nextPosition = positions[state.formation][nextPositionName]

                const intermediateTranslateX = intermediateNextPosition.x - homePosition.x
                const intermediateTranslateY = intermediateNextPosition.y - homePosition.y
                const translateX = nextPosition.x - homePosition.x
                const translateY = nextPosition.y - homePosition.y

                timeline.add({
                    translateX: intermediateTranslateX,
                    translateY: intermediateTranslateY,
                    complete: () => {
                        dancer.currentNamedPosition = intermediateNextPositionName
                    }
                }).add({
                    translateX,
                    translateY,
                    complete: () => {
                        dancer.currentNamedPosition = nextPositionName
                    }
                })

                timelines.push(timeline)

                const arrowTimeline = anime.timeline({
                    duration: 4 * BEATS,
                    easing: 'linear',
                    autoplay: false
                })

                const newRotation = calculateRotation(state, dancer, nextPositionName, direction);

                arrowTimeline.add({
                    targets: dancer.arrowId,
                    rotate: newRotation,
                    complete: () => {
                        dancer.currentOffset.rotation = newRotation
                    }
                })

                timelines.push(arrowTimeline)
            }
            break;
        default:
            throw new Error("invalid formation")
    }
    const tickerTimeline = makeTickerTimeline(4);
    timelines.push(tickerTimeline)

    timelines.forEach(timeline => timeline.play())
    return Promise.all(timelines.map(timeline => timeline.finished))
}

/**
 * Helper move to do a circle halfway in a specific direction
 * @param danceMaster
 * @param direction
 * @returns {Promise<void>}
 */
const circleHalfway = async (danceMaster, direction) => {
    updateHeader(`Circle ${direction}`)
    await quarterCircle(danceMaster, direction)
    await quarterCircle(danceMaster, direction)
}

/**
 * Helper move to do two threes in a specific direction
 * @param danceMaster
 * @param direction
 * @returns {Promise<Awaited<unknown>[]>}
 */
const twoThrees = async (danceMaster, direction) => {
    const state = danceMaster.state
    updateHeader("Two Threes")
    const timelines = [];
    for (const dancer of Object.values(state.dancers)) {
        const timeline = anime.timeline({
            targets: dancer.targetId,
            duration: 1 * BEATS,
            easing: 'easeOutQuint',
            autoplay: false
        })

        const currentOffsets = getCurrentOffset(state.formation, dancer)

        let firstTranslateX = secondTranslateX = currentOffsets.x
        let firstTranslateY = secondTranslateY = currentOffsets.y

        const bumpAmount = 10;
        switch (dancer.currentNamedPosition) {
            case Positions.FIRST_TOP_LEAD:
            case Positions.FIRST_TOP_FOLLOW:
                firstTranslateX -= bumpAmount
                secondTranslateX += bumpAmount
                break;
            case Positions.SECOND_TOP_LEAD:
            case Positions.SECOND_TOP_FOLLOW:
                firstTranslateX += bumpAmount
                secondTranslateX -= bumpAmount
                break;
            case Positions.FIRST_SIDE_LEAD:
            case Positions.FIRST_SIDE_FOLLOW:
                firstTranslateY -= bumpAmount
                secondTranslateY += bumpAmount
                break;
            case Positions.SECOND_SIDE_LEAD:
            case Positions.SECOND_SIDE_FOLLOW:
                firstTranslateY += bumpAmount
                secondTranslateY -= bumpAmount
        }

        timeline.add({
            translateX: direction === Directions.RIGHT ? firstTranslateX : secondTranslateX,
            translateY: direction === Directions.RIGHT ? firstTranslateY : secondTranslateY,
        }).add({
            translateX: currentOffsets.x,
            translateY: currentOffsets.y
        }).add({
            translateX: direction === Directions.RIGHT ? secondTranslateX : firstTranslateX,
            translateY: direction === Directions.RIGHT ? secondTranslateY : firstTranslateY,
        }).add({
            translateX: currentOffsets.x,
            translateY: currentOffsets.y
        })

        timelines.push(timeline)
    }
    const tickerTimeline = makeTickerTimeline(4);
    timelines.push(tickerTimeline)

    timelines.forEach(timeline => timeline.play())
    return Promise.all(timelines.map(timeline => timeline.finished))
}

/**
 * Helper move to sidestep a specific direction
 * @param danceMaster
 * @param direction
 * @returns {Promise<Awaited<unknown>[]>}
 */
const sidestep = async (danceMaster, direction) => {
    updateHeader(`Sidestep ${direction}`)
    const state = danceMaster.state
    const timelines = [];
    for (const dancer of Object.values(state.dancers)) {
        const timeline = anime.timeline({
            targets: dancer.targetId,
            duration: 4 * BEATS,
            easing: 'linear',
            autoplay: false
        })
        const currentOffsets = getCurrentOffset(state.formation, dancer)
        let xOffset = currentOffsets.x
        let yOffset = currentOffsets.y

        const distance = 100;
        switch (dancer.currentNamedPosition) {
            case Positions.FIRST_TOP_LEAD:
            case Positions.SECOND_TOP_FOLLOW:
                yOffset += direction === Directions.RIGHT ? -distance : distance
                break;
            case Positions.FIRST_TOP_FOLLOW:
            case Positions.SECOND_TOP_LEAD:
                yOffset += direction === Directions.RIGHT ? distance : -distance
                break;
            case Positions.FIRST_SIDE_LEAD:
            case Positions.SECOND_SIDE_FOLLOW:
                xOffset += direction === Directions.RIGHT ? distance : -distance
                break;
            case Positions.SECOND_SIDE_LEAD:
            case Positions.FIRST_SIDE_FOLLOW:
                xOffset += direction === Directions.RIGHT ? -distance : distance
                break;
        }

        timeline.add({
            translateX: xOffset,
            translateY: yOffset,
        }).add({
            translateX: currentOffsets.x,
            translateY: currentOffsets.y,
        })

        timelines.push(timeline)
    }
    const tickerTimeline = makeTickerTimeline(8);
    timelines.push(tickerTimeline)

    timelines.forEach(timeline => timeline.play())
    return Promise.all(timelines.map(timeline => timeline.finished))
}

/**
 * Helper move to turn your partner a specific direction
 * @param danceMaster
 * @param direction
 * @returns {Promise<Awaited<unknown>[]>}
 */
const turnPartnerHalfway = async (danceMaster, direction) => {
    updateHeader(`Turn Partner Halfway ${direction}`)
    const state = danceMaster.state

    const timelines = [];

    for (const dancer of Object.values(state.dancers)) {

        const partnerPositionName = danceMaster.getPositionNameFromRelationship(dancer.currentNamedPosition, Relationships.PARTNER)
        const currentPosition = positions[state.formation][dancer.currentNamedPosition]
        const partnerPosition = positions[state.formation][partnerPositionName]
        const currentOffsets = getCurrentOffset(state.formation, dancer)

        const halfwayPoint = {
            x: (currentPosition.x + partnerPosition.x) / 2,
            y: (currentPosition.y + partnerPosition.y) / 2
        }

        const desiredDistance = Math.sqrt(Math.pow(halfwayPoint.x - currentPosition.x, 2) + Math.pow(halfwayPoint.y - currentPosition.y, 2)) / 2
        const modifier = desiredDistance / Math.sqrt(Math.pow(currentPosition.y - partnerPosition.y, 2) + Math.pow(partnerPosition.x - currentPosition.x, 2))

        const pointModifier = {
            x: modifier * (currentPosition.y - partnerPosition.y),
            y: modifier * (partnerPosition.x - currentPosition.x)
        }

        const intermediatePoint = {
            x: direction === Directions.RIGHT ? halfwayPoint.x - pointModifier.x : halfwayPoint.x + pointModifier.x,
            y: direction === Directions.RIGHT ? halfwayPoint.y - pointModifier.y : halfwayPoint.y + pointModifier.y
        }

        const timeline = anime.timeline({
            targets: dancer.targetId,
            duration: 1 * BEATS,
            easing: 'linear',
            autoplay: false,
            complete: () => {
                dancer.currentNamedPosition = partnerPositionName
            }
        })

        const intermediateTranslateX = currentOffsets.x + (intermediatePoint.x - currentPosition.x)
        const intermediateTranslateY = currentOffsets.y + (intermediatePoint.y - currentPosition.y)

        const endTranslateX = currentOffsets.x + (partnerPosition.x - currentPosition.x)
        const endTranslateY = currentOffsets.y + (partnerPosition.y - currentPosition.y)

        timeline.add({
            translateX: intermediateTranslateX,
            translateY: intermediateTranslateY
        }).add({
            translateX: endTranslateX,
            translateY: endTranslateY
        })

        timelines.push(timeline)

        const newRotation = dancer.currentOffset.rotation += (direction === Directions.RIGHT ? 180 : -180)
        const arrowTimeline = anime.timeline({
            duration: 2 * BEATS,
            easing: 'linear',
            autoplay: false
        })

        arrowTimeline.add({
            targets: dancer.arrowId,
            rotate: newRotation,
            complete: () => {
                dancer.currentOffset.rotation = newRotation
            }
        })

        timelines.push(arrowTimeline)
    }
    const tickerTimeline = makeTickerTimeline(2);
    timelines.push(tickerTimeline)

    timelines.forEach(timeline => timeline.play())
    return Promise.all(timelines.map(timeline => timeline.finished))
}

/**
 * Normalize an arrow's rotation to be between 0 and 360.
 * @param {HTMLDivElement} arrow
 * @returns {number} - the normalized rotation
 */
const normalizeRotation = (arrow) => {
    const rotationStr = arrow.style.transform.match(/rotate\((.+)deg\)/)[1]
    let rotation = parseInt(rotationStr)
    rotation = rotation % 360
    if (rotation < 0) {
        rotation += 360
    }
    return rotation
}

/**
 *
 * @param {DanceMaster} danceMaster
 * @param {"ALL" | "LEADS" | "FOLLOWS"} activeRoles
 * @returns {Promise<Awaited<unknown>[]>}
 */
const turnAround = async (danceMaster, activeRoles) => {
    updateHeader('Turn Around')
    const state = danceMaster.state
    const timelines = [];

    for (const dancer of Object.values(state.dancers)) {
        if (activeRoles === "LEADS" && DancerLayouts[state.formation].indexOf(dancer.currentNamedPosition) % 2 === 1) {
            continue
        } else if (activeRoles === "FOLLOWS" && DancerLayouts[state.formation].indexOf(dancer.currentNamedPosition) % 2 === 0) {
            continue
        }

        const timeline = anime.timeline({
            targets: dancer.arrowId,
            duration: 4 * BEATS,
            easing: 'linear',
            autoplay: false
        })


        timeline.add({
            rotate: dancer.currentOffset.rotation + 180,
            complete: () => {
                dancer.currentOffset.rotation += 180
                dancer.turnedAround = !dancer.turnedAround
            }
        })

        timelines.push(timeline)
    }
    const tickerTimeline = makeTickerTimeline(4);
    timelines.push(tickerTimeline)

    timelines.forEach(timeline => timeline.play())
    return Promise.all(timelines.map(timeline => timeline.finished))
}

/**
 * Move to swing partner
 * @param danceMaster
 * @returns {Promise<void>}
 */
const swingPartner = async (danceMaster) => {
    updateHeader('Swing Partner')
    freezeHeader = true
    await turnPartnerHalfway(danceMaster, Directions.RIGHT)
    await turnPartnerHalfway(danceMaster, Directions.RIGHT)
    await turnPartnerHalfway(danceMaster, Directions.RIGHT)
    await turnPartnerHalfway(danceMaster, Directions.RIGHT)
    freezeHeader = false
}

const quarterHouse = async (danceMaster, direction) => {
    updateHeader(`Quarter House ${direction}`)
    const state = danceMaster.state
    const timelines = [];

    // groups dancers
    const groups = Object.values(state.dancers).reduce((acc, dancer) => {
        const group = FormationGroups[state.formation][dancer.currentNamedPosition]
        if (!acc[group]) {
            acc[group] = []
        }
        acc[group].push(dancer)
        return acc
    }, {})

    for (const group of Object.values(groups)) {
        const lead = group.find(dancer => DancerLayouts[state.formation].indexOf(dancer.currentNamedPosition) % 2 === 0)
        const follow = group.find(dancer => DancerLayouts[state.formation].indexOf(dancer.currentNamedPosition) % 2 === 1)

        const timeline = anime.timeline({
            duration: 2 * BEATS,
            easing: 'linear',
            autoplay: false
        })

        const leadArrowTimeline = anime.timeline({
            targets: lead.arrowId,
            duration: 2 * BEATS,
            easing: 'linear',
            autoplay: false
        })

        const followArrowTimeline = anime.timeline({
            targets: follow.arrowId,
            duration: 2 * BEATS,
            easing: 'linear',
            autoplay: false
        })

        let leadsMoving = direction === Directions.RIGHT;
        for (let i = 0; i < 2; ++i) {
            const movingDancer = leadsMoving ? lead : follow;
            const partner = leadsMoving ? follow : lead;
            const movingTimeline = leadsMoving ? leadArrowTimeline : followArrowTimeline;

            const currentPosition = positions[state.formation][movingDancer.currentNamedPosition]
            const nextPositionName = danceMaster.getNextPositionNameOfSameRole(direction, movingDancer.currentNamedPosition)
            const partnerNextPositionName = danceMaster.getNextPositionNameOfSameRole(direction, partner.currentNamedPosition)
            const nextPosition = positions[state.formation][nextPositionName]
            const movingCurrentOffsets = getCurrentOffset(state.formation, movingDancer)

            const translateX = movingCurrentOffsets.x + (nextPosition.x - currentPosition.x)
            const translateY = movingCurrentOffsets.y + (nextPosition.y - currentPosition.y)

            timeline.add({
                targets: movingDancer.targetId,
                translateX,
                translateY,
                complete: () => {
                    movingDancer.currentNamedPosition = nextPositionName
                }
            })

            let intermediateStartPosition
            let intermediateTargetPosition
            if(direction === Directions.RIGHT) {
                if (leadsMoving) {
                    // leads look at their partner's position from their next position
                    intermediateStartPosition = nextPositionName
                    intermediateTargetPosition = partner.currentNamedPosition
                } else {
                    // follows look at their partner's new position from their current position
                    intermediateStartPosition = movingDancer.currentNamedPosition
                    intermediateTargetPosition = partnerNextPositionName
                }
            } else {
                if (leadsMoving) {
                    // leads look at their partner's new position from their position (they moved first)
                    intermediateStartPosition = movingDancer.currentNamedPosition
                    intermediateTargetPosition = partnerNextPositionName
                } else {
                    // follows look at their partner's current position from their new position
                    intermediateStartPosition = nextPositionName
                    intermediateTargetPosition = partner.currentNamedPosition
                }
            }

            const intermediateAngleAndRotation = calculateAngleAndRotation(state, movingDancer.currentOffset.rotation, intermediateStartPosition, intermediateTargetPosition, direction, movingDancer)

            movingTimeline.add({
                targets: movingDancer.arrowId,
                rotate: intermediateAngleAndRotation.rotation,
                complete: () => {
                    movingDancer.currentOffset.rotation = intermediateAngleAndRotation.rotation
                }
            })

            const finalAngleAndRotation = calculateAngleAndRotation(state, intermediateAngleAndRotation.rotation, nextPositionName, partnerNextPositionName, direction, movingDancer)

            movingTimeline.add({
                rotate: finalAngleAndRotation.rotation,
                complete: () => {
                    movingDancer.currentOffset.rotation = finalAngleAndRotation.rotation
                }
            })

            leadsMoving = !leadsMoving
        }
        timelines.push(timeline)
        timelines.push(leadArrowTimeline)
        timelines.push(followArrowTimeline)
    }

    const tickerTimeline = makeTickerTimeline(4);
    timelines.push(tickerTimeline)

    timelines.forEach(timeline => timeline.play())
    return Promise.all(timelines.map(timeline => timeline.finished))
}

const getDancerTransformValues = (dancer) => {
    const transform = dancer.elem.style.transform
    const transformX = parseInt(transform.match(/translateX\((.+)px\) /)[1])
    const transformY = parseInt(transform.match(/translateY\((.+)px\)/)[1])

    return {
        x: transformX,
        y: transformY
    }
}

const facePosition = (danceMaster, dancer, targetPositionName) => {
    if(dancer.currentNamedPosition === targetPositionName) {
        return
    }

    const rotation = calculateShortestTurnRotation(dancer, targetPositionName, danceMaster.state)

    const timeline = anime.timeline({
        targets: dancer.arrowId,
        duration: 2 * BEATS,
        easing: 'linear',
        autoplay: false
    })

    timeline.add({
        rotate: rotation,
        complete: () => {
            dancer.currentOffset.rotation = rotation
        }
    })

    timeline.play()

    return timeline.finished
}

const goToPosition = (danceMaster, dancer, targetPositionName) => {
    const homePosition = positions[danceMaster.state.formation][dancer.role]
    const targetPosition = positions[danceMaster.state.formation][targetPositionName]

    const diffX = targetPosition.x - homePosition.x
    const diffY = targetPosition.y - homePosition.y

    const timeline = anime.timeline({
        targets: dancer.targetId,
        duration: 2 * BEATS,
        easing: 'linear',
        autoplay: false
    })

    timeline.add({
        translateX: diffX,
        translateY: diffY,
        complete: () => {
            dancer.currentNamedPosition = targetPositionName
        }
    })

    timeline.play()

    return timeline.finished
}

const goHome = async (danceMaster) => {
    updateHeader('Go Home')
    let timelines = []
    for(const dancer of Object.values(danceMaster.state.dancers)) {
        timelines.push(facePosition(danceMaster, dancer, dancer.role))
    }
    await Promise.all(timelines)
    timelines = []

    for(const dancer of Object.values(danceMaster.state.dancers)) {
        timelines.push(goToPosition(danceMaster, dancer, dancer.role))
    }
    await Promise.all(timelines)
    for(const dancer of Object.values(danceMaster.state.dancers)) {
        danceMaster.normalizeDancerRotations()
    }

    await faceCenter(danceMaster, false)
    count = 0
    clearHeader()
}

const randomizeDancerOffsets = (danceMaster) => {
    const min = -1
    const max = 1
    for(const dancer of Object.values(danceMaster.state.dancers)) {
        dancer.currentOffset = {
            x: (Math.random() * (max - min) + min) * 100,
            y: (Math.random() * (max - min) + min) * 100,
            rotation: Math.random() * 360
        }
        dancer.currentNamedPosition = Positions.OUT_OF_POSITION
        dancer.elem.style.transform = `translateX(${dancer.currentOffset.x}px) translateY(${dancer.currentOffset.y}px)`
        dancer.arrowElem.style.transform = `rotate(${dancer.currentOffset.rotation}deg)`
    }
}

function isElementOutsideViewport(element) {
    // Get the bounding rectangle of the element
    const rect = element.getBoundingClientRect();

    // Get the viewport dimensions (the visible area of the window)
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get the computed style of the element
    const computedStyle = window.getComputedStyle(element);

    // Extract the transform property (we're interested in translateX and translateY)
    const transform = computedStyle.transform;

    // If no transform is applied, transform will be "none"
    if (transform !== 'none') {
        // Parse the matrix values (we're interested in the translation)
        const matrix = new DOMMatrix(transform);

        // Get the translateX and translateY from the matrix
        const translateX = matrix.m41; // Translation in X (matrix.m41)
        const translateY = matrix.m42; // Translation in Y (matrix.m42)

        // Apply translation to the bounding box's coordinates
        const transformedRect = {
            top: rect.top + translateY,
            left: rect.left + translateX,
            right: rect.right + translateX,
            bottom: rect.bottom + translateY
        };

        // Check if any part of the element is outside the bounds of the viewport
        const isOutside = (
            transformedRect.top < 200 ||                   // Element is above the viewport
            transformedRect.left < 50 ||                  // Element is to the left of the viewport
            transformedRect.bottom > viewportHeight - 50 ||   // Element is below the viewport
            transformedRect.right > viewportWidth - 50       // Element is to the right of the viewport
        );

        return isOutside;
    }

    // If no transform is applied, just use the bounding rect
    return (
        rect.top < 200 ||                    // Element is above the viewport
        rect.left < 50 ||                   // Element is to the left of the viewport
        rect.bottom > viewportHeight - 50 ||    // Element is below the viewport
        rect.right > viewportWidth - 50         // Element is to the right of the viewport
    );
}

let minglingTimelinesPromise
const mingle = async (danceMaster) => {
    updateHeader('Mingling')
    mingling = true
    while(mingling) {
        const timelines = []
        for(const dancer of Object.values(danceMaster.state.dancers)) {
            dancer.currentNamedPosition = Positions.OUT_OF_POSITION
            const currentOffsets = getDancerTransformValues(dancer)
            const currentPosition = {
                x: currentOffsets.x + positions[danceMaster.state.formation][dancer.role].x,
                y: currentOffsets.y + positions[danceMaster.state.formation][dancer.role].y
            }
            const currentAngle = dancer.currentOffset.rotation + 90
            let newAngle = Math.random() * 360
            let distance = Math.random() * 200

            // if dancer went out of bounds, reverse they directions
            if (currentPosition.x < 50) {
                newAngle = 270
                distance = 100
            } else if (currentPosition.x > window.innerWidth - 50) {
                newAngle = 90
                distance = 100
            } else if (currentPosition.y < 300) {
                newAngle = 0
                distance = 100
            } else if (currentPosition.y > window.innerHeight - 100) {
                newAngle = 180
                distance = 100
            }

            const nextPosition = {
                x: currentOffsets.x + distance * Math.cos(currentAngle * (Math.PI / 180)),
                y: currentOffsets.y + distance * Math.sin(currentAngle * (Math.PI / 180))
            }

            const timeline = anime.timeline({
                duration: 4 * BEATS,
                easing: 'linear',
                autoplay: false
            })

            timeline.add({
                targets: dancer.targetId,
                translateX: nextPosition.x,
                translateY: nextPosition.y,
                complete: () => {
                    dancer.currentOffset.x = nextPosition.x
                    dancer.currentOffset.y = nextPosition.y
                }
            }).add({
                targets: dancer.arrowId,
                rotate: newAngle,
                complete: () => {
                    dancer.currentOffset.rotation = newAngle
                }
            })
            timelines.push(timeline)
        }
        timelines.forEach(timeline => timeline.play())
        minglingTimelinesPromise = Promise.all(timelines.map(timeline => timeline.finished))
        await minglingTimelinesPromise
    }
}

/**
 * Available moves
 * @type {(danceMaster: DanceMaster) => Promise<any>}
 */
const Moves = {
    mingle,
    randomizeDancerOffsets,
    goHome,
    quarterHouseRight: (danceMaster) => quarterHouse(danceMaster, Directions.RIGHT),
    quarterHouseLeft: (danceMaster) => quarterHouse(danceMaster, Directions.LEFT),
    swingPartner,
    leadsTurnAround: (danceMaster) => turnAround(danceMaster, "LEADS"),
    followsTurnAround: (danceMaster) => turnAround(danceMaster, "FOLLOWS"),
    allTurnAround: (danceMaster) => turnAround(danceMaster, "ALL"),
    turnPartnerHalfwayByTheRight: (danceMaster) => turnPartnerHalfway(danceMaster, Directions.RIGHT),
    turnPartnerHalfwayByTheLeft: (danceMaster) => turnPartnerHalfway(danceMaster, Directions.LEFT),
    sidestepRight: (danceMaster) => sidestep(danceMaster, Directions.RIGHT),
    sidestepLeft: (danceMaster) => sidestep(danceMaster, Directions.LEFT),
    faceCenter,
    facePartner,
    twoThreesToTheRight: (danceMaster) => twoThrees(danceMaster, Directions.RIGHT),
    twoThreesToTheLeft: (danceMaster) => twoThrees(danceMaster, Directions.LEFT),
    twoThreesToTheRightEndFacingPartner: (danceMaster) => Promise.all([twoThrees(danceMaster, Directions.RIGHT), facePartner(danceMaster)]),
    twoThreesToTheLeftEndFacingPartner: (danceMaster) => Promise.all([twoThrees(danceMaster, Directions.LEFT), facePartner(danceMaster)]),
    advanceAndRetire,
    fastSevensWithPartner,
    switchWithPartner,
    fastSwitchWithPartner: (danceMaster) => switchWithPartner(danceMaster, 2),
    quarterCircle,
    quarterCircleLeft: (danceMaster) => quarterCircle(danceMaster, Directions.LEFT),
    quarterCircleRight: (danceMaster) => quarterCircle(danceMaster, Directions.RIGHT),
    circleLeftHalfway: (danceMaster) => circleHalfway(danceMaster, Directions.LEFT),
    circleRightHalfway: (danceMaster) => circleHalfway(danceMaster, Directions.RIGHT),
    followsFastInnerCircleLeft: (danceMaster) => [1,2,3,4].reduce((promise, val) => {return promise.then(() => innerQuarterCircle(danceMaster, Directions.LEFT, false, val === 4, 2))}, Promise.resolve()),
    leadsFastInnerCircleLeft: (danceMaster) => [1,2,3,4].reduce((promise, val) => {return promise.then(() => innerQuarterCircle(danceMaster, Directions.LEFT, true, val === 4, 2))}, Promise.resolve()),
    leadsInnerQuarterCircleRight: (danceMaster) => innerQuarterCircle(danceMaster, Directions.RIGHT, true, false),
    leadsInnerQuarterCircleLeft: (danceMaster) => innerQuarterCircle(danceMaster, Directions.LEFT, true, false),
    followsInnerQuarterCircleRight: (danceMaster) => innerQuarterCircle(danceMaster, Directions.RIGHT, false, false),
    followsInnerQuarterCircleLeft: (danceMaster) => innerQuarterCircle(danceMaster, Directions.LEFT, false, false),
    leadsInnerQuarterCircleRightEndHome: (danceMaster) => innerQuarterCircle(danceMaster, Directions.RIGHT, true, true),
    leadsInnerQuarterCircleLeftEndHome: (danceMaster) => innerQuarterCircle(danceMaster, Directions.LEFT, true, true),
    followsInnerQuarterCircleRightEndHome: (danceMaster) => innerQuarterCircle(danceMaster, Directions.RIGHT, false, true),
    followsInnerQuarterCircleLeftEndHome: (danceMaster) => innerQuarterCircle(danceMaster, Directions.LEFT, false, true),
    clapTwice: clapTwice
}

const generateRandomName = () => {
    const names = ["Alex", "Davin", "Emmalee", "Justin", "Grace", "Danielle", "Sam", "Katie", "Paul", "Stephen", "Sharon", "Amy", "Ed", "Elaine", "Elvira", "Hailey", "Gaby", "Dawn", "Tim", "Liam", "Emma", "Noah", "Olivia", "Aiden", "Sophia", "Mason", "Isabella", "Lucas", "Mia", "Ethan", "Amelia", "James", "Harper", "Benjamin", "Evelyn", "Elijah", "Charlotte", "William", "Abigail", "Alexander", "Ella", "Henry", "Chloe", "Sebastian", "Madison", "Jackson", "Scarlett", "Mateo", "Aria", "Daniel", "Grace", "Matthew", "Zoe", "Joseph", "Riley", "David", "Lily", "Samuel", "Avery", "David", "Victoria", "John", "Camila", "Gabriel", "Penelope", "Carter", "Layla", "Owen", "Mila", "Wyatt", "Ellie", "Jack"]

    return names[Math.floor(Math.random() * names.length)]
}

class MoveSet {
    constructor() {
        this.moves = []
    }

    withMove(move) {
        this.moves.push(move)
        return this
    }

    withMoves(moves) {
        this.moves.push(...moves)
        return this
    }

    async do(danceMaster) {
        return this.moves.reduce((promise, move) => {
            return promise.then(() => move(danceMaster))
        }, Promise.resolve())
    }
}

class FigureDance {
    constructor(name) {
        this.name = name
        this.figures = {}
        this.bodies = {}
        this.steps = (figureDance) => {
            console.log("No steps defined")
            return []
        }
    }

    withBody(name, body) {
        this.bodies[name] = body
        return this
    }

    withFigure(name, moveSet) {
        this.figures[name] = moveSet
        return this
    }

    withSteps(steps) {
        this.steps = steps
        return this
    }

    async do(danceMaster) {
        const steps = this.steps(this);
        for (const step of steps) {
            await step.do(danceMaster)
            danceMaster.normalizeDancerRotations();
        }
    }
}

/**
 * DanceMaster class
 */
class DanceMaster {
    /**
     *
     * @param options
     */
    constructor(options) {
        this.state = {
            formation: options.formation,
            dancers: {},
        }

        this.moves = [];

        this.danceFloor = window.document.getElementById('dance-floor')
        this.movesButtons = window.document.getElementById('moves')
        this.formationButtons = window.document.getElementById('formations')

        const centerElem = document.createElement('div')
        centerElem.id = 'center-point'
        this.danceFloor.appendChild(centerElem)
        centerElem.style.left = `${positions.center.x - 5}px`
        centerElem.style.top = `${positions.center.y - 5}px`

        switch (options.formation) {
            case Formations.EIGHT_HAND_SQUARE:
                this.createDancer('red', options.formation, Positions.FIRST_TOP_LEAD)
                this.createDancer('blue', options.formation, Positions.FIRST_TOP_FOLLOW);
                this.createDancer('green', options.formation, Positions.SECOND_TOP_LEAD);
                this.createDancer('yellow', options.formation, Positions.SECOND_TOP_FOLLOW);
                this.createDancer('purple', options.formation, Positions.FIRST_SIDE_LEAD);
                this.createDancer('orange', options.formation, Positions.FIRST_SIDE_FOLLOW);
                this.createDancer('pink', options.formation, Positions.SECOND_SIDE_LEAD);
                this.createDancer('brown', options.formation, Positions.SECOND_SIDE_FOLLOW);
                break;
            case Formations.TWO_FACING_TWO:
                this.createDancer('red', options.formation, Positions.FIRST_TOP_LEAD)
                this.createDancer('blue', options.formation, Positions.FIRST_TOP_FOLLOW);
                this.createDancer('green', options.formation, Positions.SECOND_TOP_LEAD);
                this.createDancer('yellow', options.formation, Positions.SECOND_TOP_FOLLOW);
                break;
            // case Formations.SOLO:
            //     this.createDancer('red', options.formation, Positions.FIRST_TOP_LEAD)
            //     break;
            default:
                throw new Error("invalid formation")
        }

        for(const formation of Object.values(Formations)) {
            const button = document.createElement('button')
            button.innerHTML = formation
            button.onclick = () => {
                resetDanceMaster(formation)
            }
            this.formationButtons.appendChild(button)
        }

        // create buttons for each move
        for (const moveName in Moves) {
            const button = document.createElement('button')
            button.innerHTML = moveName
            button.onclick = () => {
                this.runMove(Moves[moveName])
            }
            this.movesButtons.appendChild(button)
        }
    }

    /**
     *
     * @param {(danceMaster: DanceMaster) => Promise<any>}dance
     */
    addMove(dance) {
        this.moves.push(dance)
    }

    /**
     * Run a single move
     * @param move
     * @returns {Promise<void>}
     */
    async runMove(move) {
        if(mingling && move !== Moves.mingle) {
            mingling = false
            updateHeader('Stop Mingling')
            await minglingTimelinesPromise
            await goHome(this)
        }
        try {
            await move(this)
        } catch (e) {
            console.error(e)
            updateHeader(e.message)
            setTimeout(() => {
                clearHeader()
            }, 2000)
        }
        this.normalizeDancerRotations();
    }

    async run() {
        for (const move of this.moves) {
            await move(this)
            this.normalizeDancerRotations();
        }
        updateHeader('Done')
    }

    /**
     * Normalize all dancer rotations to be between 0 and 360.  This helps prevent rapid unwinding when turning around.
     */
    normalizeDancerRotations() {
        for (const dancer of Object.values(this.state.dancers)) {
            const normalizedRotation = normalizeRotation(dancer.arrowElem);
            dancer.arrowElem.style.transform = `rotate(${normalizeRotation(dancer.arrowElem)}deg)`
            dancer.currentOffset.rotation = normalizedRotation
        }
    }

    clear() {
        for(const dancer of Object.values(this.state.dancers)) {
            dancer.elem.remove()
        }
        this.formationButtons.innerHTML = ''
        this.movesButtons.innerHTML = ''
    }

    adjustPositions() {
        for (const dancer of Object.values(this.state.dancers)) {
            const position = positions[this.state.formation][dancer.role]
            dancer.elem.style.left = `${position.x}px`
            dancer.elem.style.top = `${position.y}px`
        }

        const centerElem = document.getElementById('center-point')
        centerElem.style.left = `${positions.center.x - 5}px`
        centerElem.style.top = `${positions.center.y - 5}px`
    }

    async reset() {
        for (const dancer of Object.values(this.state.dancers)) {
            dancer.elem.style.left = `${positions[this.state.formation][dancer.role].x}px`
            dancer.elem.style.top = `${positions[this.state.formation][dancer.role].y}px`
            dancer.elem.style.transform = `rotate(${positions[this.state.formation][dancer.role].rotation}deg)`
            dancer.currentNamedPosition = dancer.role
            dancer.currentOffset = {
                x: 0,
                y: 0,
                rotation: positions[this.state.formation][dancer.role].rotation
            }
            dancer.facingPartner = false
            dancer.turnedAround = false
        }
    }

    createDancer(color, formation, role) {
        const name = generateRandomName()
        const dancerElem = document.createElement('div')
        dancerElem.id = role
        dancerElem.classList.add("dancer")
        dancerElem.style.left = `${positions[formation][role].x}px`
        dancerElem.style.top = `${positions[formation][role].y}px`

        const label = document.createElement('div')
        label.classList.add('label')
        label.innerHTML = `${name} <br/> ${role}`
        dancerElem.appendChild(label)

        const arrow = document.createElement('div')
        arrow.classList.add('arrow')
        arrow.id = `arrow-${role}`
        arrow.innerHTML = '↓'
        arrow.style.backgroundColor = color
        arrow.style.transform = `rotate(${positions[formation][role].rotation}deg)`
        dancerElem.appendChild(arrow)
        dancerElem.onclick = () => {
            const partner = this.getPositionNameFromRelationship(role, Relationships.PARTNER)
            const corner = this.getPositionNameFromRelationship(role, Relationships.CORNER)
            const contrary = this.getPositionNameFromRelationship(role, Relationships.CONTRARY)
            const arrowRotation = arrow.style.transform
            const facingPartner = this.state.dancers[role].facingPartner

            alert(`My Role: ${role}\nPartner: ${partner}\nCorner: ${corner}\nContrary: ${contrary}\nArrow Rotation: ${arrowRotation}\nFacing Partner: ${facingPartner}`)
        }

        this.state.dancers[role] = {
            name,
            color,
            elem: dancerElem,
            role,
            targetId: `#${role}`,
            arrowId: `#${arrow.id}`,
            arrowElem: arrow,
            position: positions[formation][role],
            currentNamedPosition: role,
            group: FormationGroups[formation][role],
            currentOffset: {
                x: 0,
                y: 0,
                rotation: positions[formation][role].rotation
            },
            facingPartner: false,
            turnedAround: false
        }

        this.danceFloor.appendChild(dancerElem)
    }

    getNextPositionNameOfSameRole(direction, role) {
        switch (this.state.formation) {
            case Formations.EIGHT_HAND_SQUARE:
                const positionIndex = DancerLayouts[this.state.formation].indexOf(role)
                const numberOfPositions = DancerLayouts[this.state.formation].length;
                let nextIndex = (direction === Directions.RIGHT ? positionIndex + 2 : positionIndex - 2) % numberOfPositions
                nextIndex = (nextIndex % numberOfPositions + numberOfPositions) % numberOfPositions

                return DancerLayouts[this.state.formation][nextIndex]
            default:
                throw new Error("invalid formation")
        }
    }

    getNextPosition(direction, role) {
        switch (this.state.formation) {
            case Formations.EIGHT_HAND_SQUARE:
                const positionIndex = DancerLayouts[this.state.formation].indexOf(role)
                const numberOfPositions = DancerLayouts[this.state.formation].length;
                let nextIndex = (direction === Directions.RIGHT ? positionIndex + 1 : positionIndex - 1) % numberOfPositions
                nextIndex = (nextIndex % numberOfPositions + numberOfPositions) % numberOfPositions

                return DancerLayouts[this.state.formation][nextIndex]
            default:
                throw new Error("invalid formation")
        }
    }

    isLead(role) {
        switch (this.state.formation) {
            case Formations.TWO_FACING_TWO:
            case Formations.EIGHT_HAND_SQUARE:
                return DancerLayouts[this.state.formation].indexOf(role) % 2 === 0
            default:
                throw new Error("invalid formation")
        }
    }

    getFacingDirection(dancer) {
        const rotation = normalizeRotation(dancer.arrowElem);
        if(rotation >= 46 && rotation < 135) {
            return Directions.LEFT
        } else if(rotation >= 135 && rotation < 225) {
            return Directions.UP
        } else if(rotation >= 225 && rotation < 315) {
            return Directions.RIGHT
        } else {
            return Directions.DOWN
        }
    }

    /**
     * Get the position for a specific relationship
     * @param {Position} currentPosition
     * @param {Relationship} targetRelationship
     */
    getPositionNameFromRelationship(currentPosition, targetRelationship) {
        const positionIndex = DancerLayouts[this.state.formation].indexOf(currentPosition)
        const numberOfPositions = DancerLayouts[this.state.formation].length;
        const isLead = positionIndex % 2 === 0
        let nextIndex
        switch (this.state.formation) {
            case Formations.EIGHT_HAND_SQUARE:
                switch (targetRelationship) {
                    case Relationships.PARTNER:
                        nextIndex = isLead ? positionIndex + 1 : positionIndex - 1
                        break;
                    case Relationships.CORNER:
                        nextIndex = isLead ? positionIndex - 1 : positionIndex + 1
                        break;
                    case Relationships.CONTRARY:
                        nextIndex = isLead ? positionIndex - 3 : positionIndex + 3
                        break;
                    case Relationships.OPPOSITE:
                        nextIndex = isLead ? positionIndex - 3 : positionIndex + 3
                        break;
                    default:
                        throw new Error("invalid relationship")
                }
                break
            case Formations.TWO_FACING_TWO:
                switch (targetRelationship) {
                    case Relationships.PARTNER:
                        nextIndex = isLead ? positionIndex + 1 : positionIndex - 1
                        break;
                    case Relationships.OPPOSITE:
                    case Relationships.CORNER:
                        nextIndex = isLead ? positionIndex - 1 : positionIndex + 1
                        break;
                }
                break
            // case Formations.SOLO:
            //     return Positions.FIRST_TOP_LEAD
            default:
                throw new Error("invalid formation")
        }
        nextIndex = (nextIndex % numberOfPositions + numberOfPositions) % numberOfPositions
        return DancerLayouts[this.state.formation][nextIndex]
    }
}

let danceMaster;
window.onload = async () => {
    danceMaster = new DanceMaster({
        formation: Formations.EIGHT_HAND_SQUARE
    });

    await danceMaster.runMove(Moves.randomizeDancerOffsets)
    await danceMaster.runMove(Moves.mingle)

    // danceMaster.addMove(Moves.facePartner)
    // danceMaster.addMove(Moves.swingPartner)
    // danceMaster.addMove(Moves.facePartner)
    // danceMaster.addMove(Moves.quarterHouseRight)
    // danceMaster.addMove(Moves.quarterHouseRight)
    // danceMaster.addMove(Moves.quarterHouseRight)
    // danceMaster.addMove(Moves.quarterHouseRight)
    // danceMaster.addMove(Moves.quarterHouseLeft)
    // danceMaster.addMove(Moves.quarterHouseLeft)
    // danceMaster.addMove(Moves.quarterHouseLeft)
    // danceMaster.addMove(Moves.quarterHouseLeft)
}

const resetDanceMaster = (formation) => {
    danceMaster.clear()
    danceMaster = new DanceMaster({
        formation
    });
}

const threeTunes = new FigureDance("Three Tunes")
    .withFigure("Right Right/Left",
        new MoveSet()
        .withMoves([
            Moves.quarterCircleLeft,
            Moves.twoThreesToTheLeft,
            Moves.quarterCircleRight,
            Moves.twoThreesToTheRight,
            Moves.quarterCircleRight,
            Moves.twoThreesToTheRight,
            Moves.quarterCircleLeft,
            Moves.twoThreesToTheLeft,
        ]
    ))
    .withBody("Rings",
        new MoveSet()
        .withMoves([
            Moves.followsFastInnerCircleLeft,
            Moves.clapTwice,
            Moves.fastSwitchWithPartner,
            Moves.switchWithPartner,
            Moves.leadsFastInnerCircleLeft,
            Moves.clapTwice,
            Moves.fastSwitchWithPartner,
            Moves.switchWithPartner,
        ]))
    .withSteps((figureDance) => {
        return [
            figureDance.figures["Right Right/Left"],
            figureDance.bodies["Rings"]
        ]
    })

const doThreeTunes = async () => {
    mingling = false
    resetDanceMaster(Formations.EIGHT_HAND_SQUARE)
    await goHome(danceMaster)
    await threeTunes.do(danceMaster)
}

const bonfireDance = async () => {
    mingling = false
    resetDanceMaster(Formations.EIGHT_HAND_SQUARE)
    danceMaster.withMove(Moves.advanceAndRetire)
    danceMaster.withMove(Moves.advanceAndRetire)
    danceMaster.withMove(Moves.quarterCircleRight)
    danceMaster.withMove(Moves.twoThreesToTheRight)
    danceMaster.withMove(Moves.quarterCircleLeft)
    danceMaster.withMove(Moves.twoThreesToTheLeft)
    danceMaster.withMove(Moves.advanceAndRetire)
    danceMaster.withMove(Moves.advanceAndRetire)
    danceMaster.withMove(Moves.quarterCircleLeft);
    danceMaster.withMove(Moves.twoThreesToTheLeft);
    danceMaster.withMove(Moves.quarterCircleRight)
    danceMaster.withMove(Moves.twoThreesToTheRightEndFacingPartner);
    danceMaster.withMove(Moves.sidestepRight);
    danceMaster.withMove(Moves.turnPartnerHalfwayByTheRight);
    danceMaster.withMove(Moves.turnPartnerHalfwayByTheLeft);
    danceMaster.withMove(Moves.sidestepLeft);
    danceMaster.withMove(Moves.turnPartnerHalfwayByTheLeft);
    danceMaster.withMove(Moves.turnPartnerHalfwayByTheRight);
    danceMaster.withMove(Moves.faceCenter);
    danceMaster.withMove(Moves.followsInnerQuarterCircleRight);
    danceMaster.withMove(Moves.followsTurnAround)
    danceMaster.withMove(Moves.followsInnerQuarterCircleRightEndHome);
    danceMaster.withMove(Moves.followsTurnAround)
    danceMaster.withMove(Moves.leadsInnerQuarterCircleLeft);
    danceMaster.withMove(Moves.leadsTurnAround)
    danceMaster.withMove(Moves.leadsInnerQuarterCircleLeftEndHome);
    danceMaster.withMove(Moves.leadsTurnAround)

    danceMaster.run();
}

window.addEventListener('resize', function() {
    positions = calcPositions(window.innerWidth, window.innerHeight)
    danceMaster.adjustPositions()
});
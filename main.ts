function COLOR () {
    R = mooncar.ColorSensorRead(mooncar.Channel.Red)
    G = mooncar.ColorSensorRead(mooncar.Channel.Green)
    B = mooncar.ColorSensorRead(mooncar.Channel.Blue)
    serial.writeLine("R:" + R + "___G:" + G + "___B:" + B)
    if (R > 200 && G > 200 && B > 200) {
        strip.showColor(neopixel.rgb(50, 50, 50))
        basic.showString("w")
    } else {
        if (R > G && R > B) {
            strip.showColor(neopixel.rgb(50, 0, 0))
            basic.showString("R")
        } else {
            if (G > R && G > B) {
                strip.showColor(neopixel.rgb(0, 50, 0))
                basic.showString("G")
            } else {
                if (B > R && B > G) {
                    strip.showColor(neopixel.rgb(0, 0, 50))
                    basic.showString("B")
                } else {
                    if (R < 80 && G < 80 && B < 80) {
                        strip.showColor(neopixel.colors(NeoPixelColors.Black))
                        basic.showString("b")
                    }
                }
            }
        }
    }
}
function IR () {
    if (mooncar.LineFollowerSensor() == 0) {
        strip.showColor(neopixel.rgb(0, 0, 0))
        basic.showNumber(0)
    } else {
        if (mooncar.LineFollowerSensor() == 1) {
            strip.setPixelColor(1, neopixel.rgb(50, 50, 50))
            strip.setPixelColor(2, neopixel.rgb(0, 0, 0))
            basic.showNumber(1)
        } else {
            if (mooncar.LineFollowerSensor() == 2) {
                strip.setPixelColor(1, neopixel.rgb(0, 0, 0))
                strip.setPixelColor(2, neopixel.rgb(50, 50, 50))
                basic.showNumber(2)
            } else {
                strip.setPixelColor(1, neopixel.rgb(50, 50, 50))
                strip.setPixelColor(2, neopixel.rgb(50, 50, 50))
                basic.showNumber(3)
            }
        }
    }
    strip.show()
}
let B = 0
let G = 0
let R = 0
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P12, 8, NeoPixelMode.RGB)
let Mode = 0
mooncar.ColorSensorinit()
led.enable(true)
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        led.enable(true)
        basic.showString("I")
        basic.pause(500)
        Mode = 1
    } else {
        if (input.buttonIsPressed(Button.B)) {
            led.enable(true)
            basic.showString("C")
            mooncar.Filllight(mooncar.Switch.Open)
            basic.pause(500)
            Mode = 2
        }
    }
    if (Mode == 1) {
        IR()
    }
    if (Mode == 2) {
        COLOR()
        basic.pause(200)
    }
})

const hitMe = (() => {
        const msg = "This is findme! Hello there - this is a test of the VSCode debug mechanism!"
        console.log(`A: %c ${msg}`, "color: red; font-size: 24px;")
        alert("B: " + msg)
        console.log(`C: %c ${msg}`, "color: lightgreen; font-size: 24px;")

      }); 

import speech_recognition as sr
import pyttsx3

mic = sr.Recognizer()

def input_txt():
    while(True):
        try:
            with sr.Microphone() as source2:
                mic.adjust_for_ambient_noise(source2, duration=0.2)
                audio2 = mic.listen(source2)

                output_text = mic.recognize_google(audio2)
                return output_text
        except sr.RequestError as e:
            print("error; {0}".format(e))
            return
        except sr.UnknownValueError:
            print("ERROR")

def output_txt(text):
    f = open("output.txt", 'a')
    f.write(text)
    f.write('\n')
    f.close()
    return


while (True):
    text = input_txt()
    output_txt(text)
    print("Wrote text")

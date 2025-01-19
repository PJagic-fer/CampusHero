from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from time import sleep

chusername = r"campushero802@gmail.com"
chpassword = r"campusherofer"
chrome_path = r"C:\Program Files\chrome-win64\chrome.exe"
chrome_options = Options()
chrome_options.add_argument("--allow-insecure-localhost")
chrome_options.add_argument("--ignore-certificate-errors")
chrome_options.add_argument("--disable-blink-features=AutomationControlled")
chrome_options.add_argument("--disable-extensions")
chrome_options.add_argument("--start-maximized")
chrome_options.add_argument("--disable-popup-blocking")
chrome_options.binary_location = chrome_path

print("Starting test")
driver = webdriver.Chrome(options=chrome_options) 


try:
    print("Launching browser...")
    driver.get("http://localhost:80/")
    print("Page loaded.")

    print("Finding elements...")
    ime_input = driver.find_element(By.NAME, "name")
    phone_input = driver.find_element(By.NAME, "phone")
    message_input = driver.find_element(By.NAME, "message")
    submit_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Pošalji')]")
    driver.execute_script("arguments[0].scrollIntoView(true);", phone_input)
    print("Elementi pronađeni")

    phone_input.send_keys("123123123123")
    message_input.send_keys("Test poruka")

    submit_button.click()

    if(message_input.get_attribute("value") == "Test poruka"):
        print("Test successful, post was not sent")
    else:
        print("Failed, post was sent")

except Exception as error:
    print("Error:", error)
    print("Test ended with unexpected error")
    print("PAD")
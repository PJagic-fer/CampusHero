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
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--log-level=3")
chrome_options.add_argument("--disable-logging")
chrome_options.add_argument("--silent")
chrome_options.binary_location = chrome_path

print("Starting test")
driver = webdriver.Chrome(options=chrome_options) 


try:
    print("Launching browser...")
    driver.get("http://localhost:80/")
    print("Page loaded.")

    print("Finding 'Prijavi se!' button...")
    button = WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Prijavi se!')]"))
    )
    button.click()
    print("Prijavi se! button clicked.")

    core_window = driver.current_window_handle

    login_button = WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.CLASS_NAME, "S9gUrf-YoZ4jf"))
    )
    login_button.click()
    print("Google login button clicked.")
    

    sleep(2)

    all_windows = driver.window_handles

            #switch to popup window
    for window in all_windows:
        if window != core_window:
            popup = window
            driver.switch_to.window(window)
            print("Switched to the popup window.")
            break

            #mail login
    mail_input = WebDriverWait(driver, 30).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "input[type='email']") )
    )
    driver.execute_script("arguments[0].value = arguments[1];", mail_input, chusername)
    mail_input.send_keys(Keys.RETURN)
    print("Entered email")

            #password login
    pass_input = WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='password']") )
    )
    pass_input = WebDriverWait(driver, 30).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "input[type='password']") )
    )
    driver.execute_script("arguments[0].value = arguments[1];", pass_input, chpassword)
    pass_input.send_keys(Keys.RETURN)
    print("Entered password")

    button = WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.XPATH, "//button[.//span[text()='Continue']]"))
    )
    button = WebDriverWait(driver, 30).until(
        EC.element_to_be_clickable((By.XPATH, "//button[.//span[text()='Continue']]"))
    )
    button.click()

    print("Logged in")

    driver.switch_to.window(core_window)

    modal_overlay = WebDriverWait(driver, 10).until(
            EC.invisibility_of_element_located((By.CLASS_NAME, 'modal-overlay'))
    )
    try:
        button = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, "//button[a]"))
        )
        if(button.find_element(By.TAG_NAME, "a").text == "Pozdrav, Campus"):
            print("Test successful")
            print("PROLAZ")
        else:
            print("Test failed")
            print("PAD")
        
    except:
        print("Test failed")
        print("PAD")

except Exception as error:
    print("Error:", error)
    print("Test ended with unexpected error")
    print("PAD")
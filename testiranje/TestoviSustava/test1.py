from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys

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
    button = WebDriverWait(driver, 40).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Prijavi se!')]"))
    )
    button.click()
    print("Prijavi se! button clicked.")

    core_window = driver.current_window_handle
    try:
        login_button = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.CLASS_NAME, "S9gUrf-YoZ4jf"))
        )
        login_button.click()
    except:
        driver.refresh()
        button = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Prijavi se!')]"))
        )
        button.click()
        login_button = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.CLASS_NAME, "S9gUrf-YoZ4jf"))
        )
        login_button.click()

    print("Google login button clicked.")

    all_windows = driver.window_handles

            #switch to popup window
    for window in all_windows:
        if window != core_window:
            popup = window
            driver.switch_to.window(popup)
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
        EC.element_to_be_clickable((By.CSS_SELECTOR, "input[type='password']"))
    )
    driver.execute_script("arguments[0].value = arguments[1];", pass_input, chpassword)
    pass_input.send_keys(Keys.RETURN)
    print("Entered password")

    continue_button = WebDriverWait(driver, 30).until(
        EC.element_to_be_clickable((By.XPATH, "//button[.//span[text()='Continue']]"))
    )
    continue_button.click()

    print("Logged in")

    driver.switch_to.window(core_window)

    modal_overlay = WebDriverWait(driver, 10).until(
            EC.invisibility_of_element_located((By.CLASS_NAME, 'modal-overlay'))
    )

    try:
            #Fakulteti page
        print("Going to Fakulteti page...")
        button = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, "(//div[@class='grupa1']//button[@class='guide'])[1]"))
        )
        driver.execute_script("arguments[0].scrollIntoView(true);", button)
        button = WebDriverWait(driver, 30).until(
            EC.element_to_be_clickable((By.XPATH, "(//div[@class='grupa1']//button[@class='guide'])[1]"))
        )
        button.click()
        current_url = driver.current_url
        if(current_url != "http://localhost/Fakulteti"):
            raise Exception("Page couldn't be accessed")
        print("Fakulteti page avaivable")
        back_button = driver.find_element(By.CLASS_NAME, "logo-text")
        back_button.click()

            #Studentski domovi page
        print("Going to Studentski domovi page...")
        button = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, "(//div[@class='grupa1']//button[@class='guide'])[2]"))
        )
        driver.execute_script("arguments[0].scrollIntoView(true);", button)
        button = WebDriverWait(driver, 30).until(
            EC.element_to_be_clickable((By.XPATH, "(//div[@class='grupa1']//button[@class='guide'])[2]"))
        )
        button.click()
        current_url = driver.current_url
        if(current_url != "http://localhost/Domovi"):
            raise Exception("Page couldn't be accessed")
        print("Studentski domovi page avaivable")
        back_button = driver.find_element(By.CLASS_NAME, "logo-text")
        back_button.click()

            #Live menza page
        print("Going to Live menza page...")
        button = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, "(//div[@class='grupa1']//button[@class='guide'])[3]"))
        )
        driver.execute_script("arguments[0].scrollIntoView(true);", button)
        button = WebDriverWait(driver, 30).until(
            EC.element_to_be_clickable((By.XPATH, "(//div[@class='grupa1']//button[@class='guide'])[3]"))
        )
        button.click()
        current_url = driver.current_url
        if(current_url != "http://localhost/Menze"):
            raise Exception("Page couldn't be accessed")
        print("Live menza page avaivable")
        back_button = driver.find_element(By.CLASS_NAME, "logo-text")
        back_button.click()


            #Javni prijevoz page
        print("Going to Javni prijevoz page...")
        button = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, "(//div[@class='grupa2']//button[@class='guide'])[1]"))
        )
        driver.execute_script("arguments[0].scrollIntoView(true);", button)
        button = WebDriverWait(driver, 30).until(
            EC.element_to_be_clickable((By.XPATH, "(//div[@class='grupa2']//button[@class='guide'])[1]"))
        )
        button.click()
        current_url = driver.current_url
        if(current_url != "http://localhost/JavniPrijevoz"):
            raise Exception("Page couldn't be accessed")
        print("Javni prijevoz page avaivable")
        back_button = driver.find_element(By.CLASS_NAME, "logo-text")
        back_button.click()

            #Pronađi Buddy-a page
        print("Going to Pronađi Buddy-a page...")
        button = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, "(//div[@class='grupa2']//button[@class='guide'])[2]"))
        )
        driver.execute_script("arguments[0].scrollIntoView(true);", button)
        button = WebDriverWait(driver, 30).until(
            EC.element_to_be_clickable((By.XPATH, "(//div[@class='grupa2']//button[@class='guide'])[2]"))
        )
        button.click()
        current_url = driver.current_url
        if(current_url != "http://localhost/Buddy"):
            raise Exception("Page couldn't be accessed")
        print("Buddy page avaivable")
        back_button = driver.find_element(By.CLASS_NAME, "logo-text")
        back_button.click()

        print("Test successful, sve stranice su dostupne")
        print("PROLAZ")
        
    except Exception as error:
        print(error)
        print("Test failed")
        print("PAD")

except Exception as error:
    print("Error:", error)
    print("Test ended with unexpected error")
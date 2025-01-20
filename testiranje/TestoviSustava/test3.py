from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

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

    print("Got to Javni prijevoz site")

    current_url = driver.current_url
    if(current_url != "http://localhost/JavniPrijevoz"):
        raise Exception("Page couldn't be accessed")

    print("Finding content")

    page_content_container = WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.CLASS_NAME, "public-transport-info-container"))
    )
    page_content = page_content_container.text

    if(page_content != ""):
        print("Test successful, the survival guide is avaivable to user")
        print("PROLAZ")
    else:
        print(page_content)
        print("Test failed, test wasn't successful")
        print("PAD")

except Exception as error:
    print("Error:", error)
    print("Test ended with unexpected error")
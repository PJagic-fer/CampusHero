from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from time import sleep
from selenium.webdriver.support.ui import Select

chusername = r"campushero802@gmail.com"
chpassword = r"campusherofer"
chjmbag =  "0036512345"
chcity = 'Špišić Bukovica'
chdorm = 'SD Stjepan Radić'
chfaculty = 'Fakultet elektrotehnike i računarstva'
chrome_path = r"C:\Program Files\chrome-win64\chrome.exe"
    #C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe
    #C:\Program Files\chrome-win64\chrome.exe
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

    sleep(2)
            #password login
    pass_input = WebDriverWait(driver, 30).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "input[type='password']") )
    )
    driver.execute_script("arguments[0].value = arguments[1];", pass_input, chpassword)
    pass_input.send_keys(Keys.RETURN)
    print("Entered password")

    sleep(3)

    button = WebDriverWait(driver, 30).until(
        EC.element_to_be_clickable((By.XPATH, "//button[.//span[text()='Continue']]"))
    )
    button.click()

    print("Logged in")
            #switch to core window
    driver.switch_to.window(core_window)

    modal_overlay = WebDriverWait(driver, 10).until(
            EC.invisibility_of_element_located((By.CLASS_NAME, 'modal-overlay'))
    )

            #Going to /Profile
    profile_button = WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.XPATH, "//button[a]"))
    )
    profile_button.click()

    print("opened /Profile")

    sleep(3)

    print("Entering info...")

    jmbag_input = driver.find_element(By.NAME, "jmbag")
    jmbag_input.send_keys(chjmbag)
    #driver.execute_script("arguments[0].value = arguments[1];", jmbag_input, chjmbag)
    print("Entered jmbag")

    city_select = driver.find_element(By.NAME, "city")
    select = Select(city_select)
    select.select_by_visible_text(chcity)
    print("Selected city")

    dom_select = driver.find_element(By.NAME, "studentHome")
    select = Select(dom_select)
    select.select_by_visible_text(chdorm)
    print("Selected dorm")

    uni_select = driver.find_element(By.NAME, "faculty")
    select = Select(uni_select)
    select.select_by_visible_text(chfaculty)
    print("Selected faculty")

    submit_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Pohrani promjene')]")
    submit_button.click()

    sleep(10)

    back_button = driver.find_element(By.CLASS_NAME, "logo-text")
    back_button.click()

    sleep(2)

    profile_button.click()

    jmbag_input = driver.find_element(By.NAME, "jmbag")
    entered_jmbag = jmbag_input.get_attribute("value")
    print("Jmbag entered value: ", entered_jmbag)

    city_select = driver.find_element(By.NAME, "city")
    select = Select(city_select)
    selected_city = select.first_selected_option.text
    print("Selected city: ", selected_city)

    dom_select = driver.find_element(By.NAME, "studentHome")
    select = Select(dom_select)
    selected_dorm = select.first_selected_option.text
    print("Selected dorm: ", selected_dorm)

    uni_select = driver.find_element(By.NAME, "faculty")
    select = Select(uni_select)
    selected_uni = select.first_selected_option.text
    print("Selected faculty: ", selected_uni)

    if(entered_jmbag == chjmbag and selected_city == chcity and selected_dorm == chdorm and selected_uni == chfaculty):
        print("Test successful")
        print("PROLAZ")
    else:
        print("Test failed")
        print("PAD")

        
    

except Exception as error:
    print("Test failed")
    print("PAD")
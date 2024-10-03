// create a class object that will be used to store the session data
// internal fields include userId, isActive, loginDate, expireDate
// each field should contain a setter to update the session object
// there should be a method to load the object's fields given a session string
// there should be a method to save the object's fields to a session string
// there should be a constructor that takes a session string and loads the object's fields
// this class object will be created and used in the sessionState.tsx file
// there should be no imports. this class is only used to maintain the session state

export class Session {
  private userId: string | null = null
  private isActive: boolean | null = null
  private loginDate: Date | null = null
  private expireDate: Date | null = null

  constructor(sessionString: string) {
    this.loadFromSessionString(sessionString)
  }

  setUserId(userId: string) {
    this.userId = userId
  }

  setIsActive(isActive: boolean) {
    this.isActive = isActive
  }

  setLoginDate(loginDate: Date) {
    this.loginDate = loginDate
  }

  setExpireDate(expireDate: Date) {
    this.expireDate = expireDate
  }

  loadFromSessionString(sessionString: string) {
    const sessionData = JSON.parse(sessionString)
    this.userId = sessionData.userId
    this.isActive = sessionData.isActive
    this.loginDate = new Date(sessionData.loginDate)
    this.expireDate = new Date(sessionData.expireDate)
  }

  saveToSessionString() {
    const sessionData = {
      userId: this.userId,
      isActive: this.isActive,
      loginDate: this.loginDate ? this.loginDate.toISOString() : null,
      expireDate: this.expireDate ? this.expireDate.toISOString() : null,
    }
    return JSON.stringify(sessionData)
  }
}

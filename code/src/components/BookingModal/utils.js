const CALENDAR_ID = "anatamassage@gmail.com";
const API_KEY = "AIzaSyBuCUPmq1l61dCyKJgBhmzCst9jniio3AM";
const SCOPE = "https://www.googleapis.com/auth/calendar";
const CLIENT_ID =
  "623431044936-3q8ha0451mvoo87hpvha2kkvegrq0pcn.apps.googleusercontent.com";

export function doFetch() {
  let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;
  let options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      dataType: "json"
    }
  };
  return fetch(url, options)
    .then(respo => {
      if (respo.statusText !== "No Content") {
        let json = respo.json();
        return json;
      }
      return respo;
    })
    .catch(function(error) {
      console.log("error", error);
      return { errors: ["A problem has occured with our server"] };
    });
}

export function doPush(event, details) {
  handleAuthClick();
}

function handleClientLoad() {
  gapi.client.setApiKey(API_KEY);
  window.setTimeout(checkAuth, 1);
  checkAuth();
}

function checkAuth() {
  gapi.auth.authorize(
    { client_id: CLIENT_ID, scope: SCOPE, immediate: true },
    handleAuthResult
  );
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById("authorize-button");
  if (authResult) {
    authorizeButton.style.visibility = "hidden";
    makeApiCall();
  } else {
    authorizeButton.style.visibility = "";
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  gapi.auth.authorize(
    { client_id: CLIENT_ID, scope: SCOPE, immediate: false },
    handleAuthResult
  );
  return false;
}

function makeApiCall() {
  var resource = {
    summary: "Appointment",
    location: "Somewhere",
    start: {
      dateTime: "2018-03-16T10:00:00.000-07:00"
    },
    end: {
      dateTime: "2018-03-16T10:25:00.000-07:00"
    }
  };

  var request = gapi.client.calendar.events.insert({
    calendarId: CALENDAR_ID,
    resource: resource
  });
  request.execute(function(resp) {
    console.log(resp);
  });
}

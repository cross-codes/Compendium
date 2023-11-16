# Building the Text summarizer app

The app will have a client side (website), a server side (backend),
and an external API integration. The components interact as such:

![Structure of the App](./img/app_structure.png)

## (1) The HTML and CSS files

The HTML and CSS files define the structure, layout and design of the webpage.
We assign `identifiers` to the elements that will be referenced (and manipulated)
in other files

## (2) The server

Our server is located in the `app.js` file, and it "serves" content on the web.
The server will listen for incoming calls from clients (like web browsers),
handle them and send responses

This particular `express` based server serves our website (all the files in "public"
for static files), and a `POST` endpoint (`/summarize`) that we can call from our
front end to summarize text securely, using the API.

---

## Adding the `/summarize` endpoint

In express you can easily add routes (URI responses to client requests),
using this syntax

```javascript
app.<HTTP method>('/endpoint', (req, res) => {
    /* handle request (req) and response (res) */
});
```

Hence, we need to add a `POST` endpoint called `/summarize` that will eventually
call the API to summarize text.

## (3) The script - Manipulating the HTML

In order to do this, you want to grab the elements that should be responsive. In
our case, these elements are:

* The input text area
* The submit button
* The summarized text area

Grabbing elements can be done by setting an ID to the `id` attribute of those
elements. This creates a reference to the same element

After creating the references to those elements, we need to add event listeners.
Event listeners enable our apps to respond to changes in a website.

For example when you click on a button, a `click event` is triggered.
A click event listener can be coded on that element that tells the web page to
do something in response to the click, such as open a new window or change the
text on a page. [Listed here](https://developer.mozilla.org/en-US/docs/Web/Events)
are some common event listeners that you can use.

Note: Event objects are automatically passed on to the callback function to an event
listener conventionally written as the parameter `e`. For example, `e.target`
gives the element that triggers the event.

The purpose of the `script.js` file is as follows: Scripts allow our page to be dynamic,
such as responding to clicked buttons, changing styles and updating text on the page.
Callback functions tell our app what to do when those events happen

## (4) Additional - Adding the text-to-image converter

First withing the same div as the textareas, I made an empty image tag, where
the image would be displayed. Then I added some attributes to the image class in
`styles.css`, and made a similar `POST` request to the image generation API.

The library I used `got`, can accept a response type of a `buffer`. This was passed
to the client side script, where the buffer's `data` method was converted into a
UInt8Array, which was then converted into a blob, whose URL was rendered within
the box.

It is necessary to create `new` instances of the array and blob in the client
side script because of their lifetimes.

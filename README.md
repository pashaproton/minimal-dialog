# Minimal dialog

## Minimal JavaScript dialog with no dependencies

To use the library just add styles and JavaScript
```
<link rel="stylesheet" href="...minimal-dialog.min.css">
<script src="...minimal-dialog.min.js"></script>
```

Then bind trigger by adding `data-dialog` attribute with value of an id of a dialog.
```
<button data-dialog="simple-dialog">Open dialog</button>
```

And add dialog itself to a document body
```
<dialog id="simple-dialog">
  <p>Simple modal content</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    magna aliqua.</p>
  <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
  <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
  <button data-dialog-close>Close</button>
</dialog>
```

The `<button data-dialog-close>Close</button>` is optional, but you can bind any close trigger by adding `data-dialog-close` attribute to an element.

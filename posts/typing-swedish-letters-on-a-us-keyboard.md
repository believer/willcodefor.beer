---
title: typing Swedish letters on a US keyboard
excerpt: I recently got my first US layout keyboard, a Nuphy Air75. The transition from a Swedish layout keyboard hasn't been too painful and programming feels easier as many of the brackets and things we use often are more conveniently placed and require fewer key presses.
date: 2022-02-10
tags:
  - til
  - activity/writing
layout: layouts/post.njk
modified: '2022-02-10'
modifiedDateTime: '2022-02-10 20:02'
created: '2022-02-10'
createdDateTime: '2022-02-10 10:41'
---

I recently got my first US layout keyboard, a Nuphy Air75. The transition from a Swedish layout keyboard hasn't been too painful and programming feels easier as many of the brackets and things we use often are more conveniently placed and require fewer key presses.

However, I still need to switch between writing in Swedish and English. I've set up a shortcut in macOS to switch between Swedish and English as the input source (system settings -> keyboard -> shortcuts -> input sources -> "select the previous input source") but it feels cumbersome to use whenever I just need one Swedish letter. So how would I type Swedish letters while keeping US as my input source?

- **å** is the easiest, `option + a`
- **ä** uses the umlaut accent, `option + u`, then `a`
- **ö** also uses the umlaut accent, `option + u`, then `o`
- **á** uses the acute accent, `option + e`, then `a` (this works the same for **é**, **í**, and **ó**)

To get capital letters, you use `shift` as you normally would when typing the actual letters, e.g., `option + u` then `shift + a` for **Ä**.

If you use [Karabiner](https://karabiner-elements.pqrs.org/) you can make it even easier by remapping the keys above to the key you would normally use, e.g., `option + ;` for **ö**. We can achieve this by creating a _complex modification_. Add the following inside the `rules` section of your `karabiner.json` which can be found under "Misc" -> "Open config folder" inside Karabiner.

Now you should be able to use `option + [` for **å**, `option + '` for **ä**, and `option + ;` for **ö**
	
**Note:** I've only added modifiers for the left option key.

```json
{
	"description": "left_option ['; to åäö",
	"manipulators": [
		{
			"type": "basic",
			"from": {
				"key_code": "open_bracket",
				"modifiers": { "mandatory": ["left_option"] }
			},
			"to": [{ "key_code": "a", "modifiers": ["left_option"] }]
		},
		{
			"type": "basic",
			"from": {
				"key_code": "open_bracket",
				"modifiers": {
					"mandatory": ["left_option", "left_shift"]
				}
			},
			"to": [{ "key_code": "a", "modifiers": ["left_option", "left_shift"] }]
		},

		{
			"type": "basic",
			"from": {
				"key_code": "quote",
				"modifiers": {
					"mandatory": ["left_option"]
				}
			},
			"to": [
				{ "key_code": "u", "modifiers": ["left_option"] },
				{ "key_code": "a" }
			]
		},
		{
			"type": "basic",
			"from": {
				"key_code": "quote",
				"modifiers": {
					"mandatory": ["left_option", "left_shift"]
				}
			},
			"to": [
				{ "key_code": "u", "modifiers": ["left_option"] },
				{ "key_code": "a", "modifiers": ["left_shift"] }
			]
		},

		{
			"type": "basic",
			"from": {
				"key_code": "semicolon",
				"modifiers": {
					"mandatory": ["left_option"]
				}
			},
			"to": [
				{ "key_code": "u", "modifiers": ["left_option"] },
				{ "key_code": "o" }
			]
		},

		{
			"type": "basic",
			"from": {
				"key_code": "semicolon",
				"modifiers": {
					"mandatory": ["left_option", "left_shift"]
				}
			},
			"to": [
				{ "key_code": "u", "modifiers": ["left_option"] },
				{ "key_code": "o", "modifiers": ["left_shift"] }
			]
		}
	]
}
```
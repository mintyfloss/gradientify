var MFLOSS = MFLOSS || {};

MFLOSS.gradientify = (function() {
	var module = {};

	function hexToRgb(hexValue) {
		var
			hexArray = [],
			rgbArray = []
		;

		if (hexValue.length > 0) {
			// Remove # from hex value
			if (hexValue[0] == '#') {
				hexValue = hexValue.substr(1, hexValue.length);
			}

			if (hexValue.length == 3) {
				// Expand hex value with 3 characters to 6 characters
				hexArray[0] = hexValue[0] + hexValue[0];
				hexArray[1] = hexValue[1] + hexValue[1];
				hexArray[2] = hexValue[2] + hexValue[2];
			} else {
				// Create an array that puts every 2 characters in an element of the array
				hexArray = hexValue.match(/.{1,2}/g);
			}
			
			// Create RGB value as an array
			for (var i = 0; i < hexArray.length; i++) {
				rgbArray.push(parseInt(hexArray[i], 16));
			}
			
			return rgbArray;
		}
	}

	module.paint = function(elements, color1, color2, styleProperty) {
		// Assume 1 element is passed if it's a string
		if (typeof elements == 'string') {
		
		} else {
			var
				color1Rgb = hexToRgb(color1),
				color2Rgb = hexToRgb(color2),
				rIncrement = Math.ceil((color2Rgb[0] - color1Rgb[0]) / elements.length),
				gIncrement = Math.ceil((color2Rgb[1] - color1Rgb[1]) / elements.length),
				bIncrement = Math.ceil((color2Rgb[2] - color1Rgb[2]) / elements.length),
				elementCount = 0,
				tempColorArray = []
			;
			
			for (var i in elements) {
				// Figures out the RGB values for the next element
				// Gradient progression with RGB is linear
				tempColorArray.push(color1Rgb[0] + (rIncrement * elementCount));
				tempColorArray.push(color1Rgb[1] + (gIncrement * elementCount));
				tempColorArray.push(color1Rgb[2] + (bIncrement * elementCount));

				// Applies gradient color
				elements[i].style[styleProperty] = 'rgb(' + tempColorArray.join(',') + ')';

				// Resets array for next element
				tempColorArray = [];
				
				elementCount++;
			}
		}
	}

	return module.paint;
}());
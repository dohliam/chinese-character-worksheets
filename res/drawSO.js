/*
*	Draws stroke order of the given character on the page in the (hidden) "#strokeOrderSvgs" div.
*	String character = the given character
*	Function callback() = function that will be called after drawSO is done
*/
// helper function
	function renderFanningStrokes(target, strokes) {
	  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	  svg.style.width  = '6.75px';
	  svg.style.height = '6.75px';
	  svg.style.marginRight = '3px';
	  target.appendChild(svg);
	  var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

	  // set the transform property on the g element so the character renders at 75x75
	  var transformData = HanziWriter.getScalingTransform(6.75,6.75);
	  group.setAttributeNS(null, 'transform', transformData.transform);
	  svg.appendChild(group);

	  strokes.forEach(function(strokePath) {
		var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		path.setAttributeNS(null, 'd', strokePath);
		// style the character paths
		path.style.fill = '#000';
		group.appendChild(path);
	  });
	}
// main function
function drawSO(character, callback){
	HanziWriter.loadCharacterData(character).then(function(charData) {
		var target = document.getElementById('strokeOrderSvgs');
		for (var i = 0; i < charData.strokes.length; i++) {
			var strokesPortion = charData.strokes.slice(0, i + 1);
			renderFanningStrokes(target, strokesPortion);
		}
		callback();
	});
}

import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { concatClassNames } from '../helpers/concatClassNames';

/**
 * This hook accepts a ref to any element and adds a
 * click event handler that creates ripples when click
 */
export default function useRipple(ref) {
	const [ripples, setRipples] = useState([]);

	useEffect(() => {
		//check if there's a ref
		if (ref.current) {
			const elem = ref.current;

			//add a click handler for the ripple
			function clickHandler(e) {
				//calculate the position and dimensions of the ripple.
				//based on click position and button dimensions
				let rect = elem.getBoundingClientRect();

				let left = e.clientX - rect.left;
				let top = e.clientY - rect.top;
				const height = elem.clientHeight;
				const width = elem.clientWidth;
				const diameter = Math.max(width, height);
				setRipples([
					...ripples,
					{
						top: top - diameter / 2,
						left: left - diameter / 2,
						height: Math.max(width, height),
						width: Math.max(width, height),
					},
				]);
			}

			elem.addEventListener('click', clickHandler);

			//clean up when the component is unmounted
			return () => {
				elem.removeEventListener('click', clickHandler);
			};
		}
	}, [ref, ripples]);

	//add a debounce so that if the user doesn't click after 1s, we remove the ripples
	const _debounced = useDebounce(ripples, 1000);
	useEffect(() => {
		if (_debounced.length) {
			setRipples([]);
		}
	}, [_debounced.length]);

	//map through the ripples and return span elements.
	//this will be added to the button component later
	let elements = ripples?.map((style, index) => {
		return (
			<span
				key={index}
				className={concatClassNames(
					'absolute bg-black rounded-[50%] opacity-[10%] animate-ripple'
				)}
				style={{
					...style,
					position: 'aboslute',
					//should be absolutely positioned
					transform: 'scale(0)',
				}}
			/>
		);
	});

	return elements;
}

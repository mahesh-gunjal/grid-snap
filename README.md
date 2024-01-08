# Summary

- The purpose of this app is to allow users to add photos to a grid-based interface, providing actions such as adding, removing, and expanding photos within the grid cells.

# Features

1. Grid View

	- The photo gallery will feature a grid view with dotted borders, organized in rows and columns.
	- Each row will consist of four columns.
	- Cells within the grid will accommodate photos added by the user.

2. Add Photo Action

	- Each grid cell will have an "Add Photo" action that becomes visible when hovered over.
	- Clicking the "Add Photo" action will enable users to upload a photo to the respective grid cell.

3. Remove Photo Option

	After a photo is added, a "Remove Photo" option will be available on the cell, allowing users to delete the selected photo.

4. Expand/Contract Feature

	- Each cell with a photo will contain an "Expand" button at the right side of the cell.
	- Clicking the "Expand" button will expand the cell to the next column, creating a colspan of two cells.
	- Clicking the "Expand" button again will contract the cell back to a single column.

5. Empty Grid Cells Condition

	- There will always be one row of empty cells visible at the bottom of the grid.
	- If a photo is added to the current row, one empty row will be visible below it.
	- This ensures a consistent layout and visual presentation on the page.


## Available Scripts

In the project directory, you can run:

### `npm start`
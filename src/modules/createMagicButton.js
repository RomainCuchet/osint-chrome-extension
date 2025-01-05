export function createMagicButton() {
  if (!document.getElementById('custom-popup')) {
    const magicButton = document.createElement('div');
    magicButton.id = 'custom-popup';
    magicButton.style.position = 'fixed';
    magicButton.style.top = '100px';
    magicButton.style.left = '100px';
    magicButton.style.width = '60px';
    magicButton.style.height = '60px';
    magicButton.style.background = '#ffffff';
    magicButton.style.border = '1px solid #cccccc';
    magicButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    magicButton.style.zIndex = '9999';
    magicButton.style.overflow = 'hidden';
    magicButton.style.borderRadius = '50%';
    magicButton.style.cursor = 'pointer';
    magicButton.style.transition = 'width 0.3s ease, height 0.3s ease, border-radius 0.3s ease';
    magicButton.style.transform = 'translate3d(0, 0, 0)'; // Enable hardware acceleration

    // Initial button image
    const buttonImage = document.createElement('img');
    buttonImage.src = chrome.runtime.getURL('assets/icons/icon512.png');
    buttonImage.style.width = '100%';
    buttonImage.style.height = '100%';
    buttonImage.style.objectFit = 'cover';
    magicButton.appendChild(buttonImage);

    document.body.appendChild(magicButton);

    // Enhanced dragging functionality
    let isDragging = false;
    let initialX, initialY;
    let currentX = 100, currentY = 100;

    // Boundary constants
    const BOUNDARY_PADDING = 10;

    function updatePosition(x, y, skipTransition = false) {
      // Boundary checking
      const maxX = window.innerWidth - magicButton.offsetWidth - BOUNDARY_PADDING;
      const maxY = window.innerHeight - magicButton.offsetHeight - BOUNDARY_PADDING;

      x = Math.max(BOUNDARY_PADDING, Math.min(x, maxX));
      y = Math.max(BOUNDARY_PADDING, Math.min(y, maxY));

      if (skipTransition) {
        magicButton.style.transition = 'none';
      }

      // Use transform for better performance
      magicButton.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      currentX = x;
      currentY = y;

      if (skipTransition) {
        // Force reflow
        magicButton.offsetHeight;
        magicButton.style.transition = 'width 0.3s ease, height 0.3s ease, border-radius 0.3s ease';
      }
    }

    function startDragging(e) {
      if (e.button === 2) { // Right-click
        e.preventDefault(); // Prevent the default context menu
        isDragging = true;
        initialX = e.clientX - currentX;
        initialY = e.clientY - currentY;

        // Add dragging class for visual feedback
        magicButton.style.cursor = 'grabbing';
        magicButton.style.userSelect = 'none';
      }
    }

    function drag(e) {
      if (!isDragging) return;

      // Calculate new position
      const newX = e.clientX - initialX;
      const newY = e.clientY - initialY;

      // Update position
      updatePosition(newX, newY, true);

      e.preventDefault();
    }

    function stopDragging() {
      if (!isDragging) return;
      isDragging = false;
      magicButton.style.cursor = 'pointer';
    }

    // Event listeners for dragging
    magicButton.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);

    // Disable default context menu on the popup
    magicButton.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      // Ensure popup stays within bounds when window is resized
      updatePosition(currentX, currentY, true);
    });

    // Rest of the menu functionality
    let isMenuOpen = false;

    magicButton.addEventListener('click', () => {
      if (!isDragging && !isMenuOpen) {
        // Transform to menu
        magicButton.style.width = '300px';
        magicButton.style.height = '320px';
        magicButton.style.borderRadius = '10px';
        magicButton.style.cursor = 'default';

        // Create return button
        const returnButton = document.createElement('div');
        returnButton.innerHTML = '↩';
        returnButton.style.position = 'absolute';
        returnButton.style.top = '10px';
        returnButton.style.left = '10px';
        returnButton.style.fontSize = '24px';
        returnButton.style.cursor = 'pointer';
        returnButton.style.width = '30px';
        returnButton.style.height = '30px';
        returnButton.style.textAlign = 'center';
        returnButton.style.lineHeight = '30px';
        returnButton.style.borderRadius = '50%';
        returnButton.style.backgroundColor = '#f0f0f0';
        returnButton.style.transition = 'background-color 0.2s';

        returnButton.addEventListener('mouseover', () => {
          returnButton.style.backgroundColor = '#e0e0e0';
        });
        returnButton.addEventListener('mouseout', () => {
          returnButton.style.backgroundColor = '#f0f0f0';
        });

        // Create close button
        const closeButton = document.createElement('div');
        closeButton.innerHTML = '🞩';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.fontSize = '24px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.width = '30px';
        closeButton.style.height = '30px';
        closeButton.style.textAlign = 'center';
        closeButton.style.lineHeight = '30px';
        closeButton.style.borderRadius = '50%';
        closeButton.style.backgroundColor = '#f0f0f0';
        closeButton.style.transition = 'background-color 0.2s';

        closeButton.addEventListener('mouseover', () => {
          closeButton.style.backgroundColor = '#e0e0e0';
        });
        closeButton.addEventListener('mouseout', () => {
          closeButton.style.backgroundColor = '#f0f0f0';
        });

        // Menu items data
        const menuItems = [
          { image: '/path/to/image1.png', text: 'Menu Item 1' },
          { image: '/path/to/image2.png', text: 'Menu Item 2' },
          { image: '/path/to/image3.png', text: 'Menu Item 3' }
        ];

        // Create menu container
        const menuContainer = document.createElement('div');
        menuContainer.style.padding = '20px';
        menuContainer.style.paddingTop = '50px';

        // Create menu items
        menuItems.forEach((item, index) => {
          const menuItem = document.createElement('div');
          menuItem.style.display = 'flex';
          menuItem.style.alignItems = 'center';
          menuItem.style.padding = '10px';
          menuItem.style.marginBottom = '10px';
          menuItem.style.cursor = 'pointer';
          menuItem.style.transition = 'transform 0.2s, background-color 0.2s';
          menuItem.style.borderRadius = '5px';

          menuItem.addEventListener('mouseover', () => {
            menuItem.style.backgroundColor = '#f0f0f0';
            menuItem.style.transform = 'translateX(5px)';
          });
          menuItem.addEventListener('mouseout', () => {
            menuItem.style.backgroundColor = 'transparent';
            menuItem.style.transform = 'translateX(0)';
          });

          const itemImage = document.createElement('img');
          itemImage.src = item.image;
          itemImage.style.width = '40px';
          itemImage.style.height = '40px';
          itemImage.style.marginRight = '15px';
          itemImage.style.objectFit = 'cover';
          itemImage.style.borderRadius = '5px';

          const itemText = document.createElement('span');
          itemText.textContent = item.text;

          menuItem.appendChild(itemImage);
          menuItem.appendChild(itemText);

          menuItem.addEventListener('click', (e) => {
            e.stopPropagation();
            alert(`Clicked ${item.text}`);
          });

          menuContainer.appendChild(menuItem);
        });

        magicButton.innerHTML = '';
        magicButton.appendChild(returnButton);
        magicButton.appendChild(menuContainer);

        returnButton.addEventListener('click', (e) => {
          e.stopPropagation();
          magicButton.style.width = '60px';
          magicButton.style.height = '60px';
          magicButton.style.borderRadius = '50%';
          magicButton.style.cursor = 'pointer';

          magicButton.innerHTML = '';
          magicButton.appendChild(buttonImage);

          isMenuOpen = false;
        });

        closeButton.addEventListener('click', (e) => {
          e.stopPropagation();
          document.body.removeChild(magicButton);
        });

        magicButton.appendChild(closeButton);

        isMenuOpen = true;
      }
    });
  }
}

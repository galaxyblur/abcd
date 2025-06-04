// cypress/e2e/data-visualization-dashboard.cy.js
// ABCD Attractor Test Suite for Interactive Data Visualization Dashboard
// These tests define the "strange attractor" boundaries for successful solutions

describe('the Data Visualization page', () => {
  beforeEach(() => {
    cy.visit('/data-viz');
  });

  it('displays a link to the index page', () => {
    // NOTE: This test coerces the agent to implement the link using an anchor element
    // with specific attributes; however, it seems unavoidable as it's the only way
    // to assert the desired behavior
    cy.get('a[title="Go to index page"]')
      .should('be.visible')
      .and('have.attr', 'href', '/');
  });

  it('should display a file upload interface', () => {
    cy.get('[data-cy=file-upload]').should('be.visible');
    cy.get('[data-cy=file-upload-button]').should('contain.text', 'Upload CSV');
    cy.get('[data-cy=file-upload-input]').should('have.attr', 'accept', '.csv');
  });

  it('should not show data or charts before a file has been uploaded', () => {
    cy.get('[data-cy=chart-section]').should('not.exist');
  });

  it('should handle CSV file upload and parsing', () => {
    cy.get('[data-cy=file-upload-input]').selectFile('cypress/fixtures/sample-data.csv', { force: true });

    // Should show success message and data preview
    cy.get('[data-cy=chart-section]').should('be.visible');
    cy.get('[data-cy=upload-success]').should('be.visible');
    cy.get('[data-cy=data-preview]').should('be.visible');
    cy.get('[data-cy=data-preview] tbody tr').should('have.length.at.least', 3);
  });

  describe('after uploading a file', () => {
    it('should generate at least 4 different chart types', () => {
      // Upload test data first
      cy.get('[data-cy=file-upload-input]').selectFile('cypress/fixtures/chart-data.csv', { force: true });

      /* AGENT: The chart section and export section should only be displayed after a successful
       * file upload (no errors and has valid data).
       */
      cy.get('[data-cy=chart-section]').should('be.visible');
      cy.get('[data-cy=export-section]').should('be.visible');

      // Should display chart type options
      cy.get('[data-cy=chart-types]').should('be.visible')

      // Required chart types
      const requiredCharts = ['bar', 'line', 'pie', 'scatter']
      requiredCharts.forEach(chartType => {
        cy.get(`[data-cy=chart-option-${chartType}]`).should('exist')
      })

      // Should be able to generate each chart type
      requiredCharts.forEach(chartType => {
        cy.get(`[data-cy=chart-option-${chartType}]`).click()
        cy.get(`[data-cy=chart-${chartType}]`).should('be.visible')
        cy.get(`[data-cy=chart-${chartType}] svg, [data-cy=chart-${chartType}] canvas`).should('exist')
      })
    })

    it('should provide interactive filtering capabilities', () => {
      // Upload test data with multiple categories
      cy.get('[data-cy=file-upload-input]').selectFile('cypress/fixtures/filter-data.csv', { force: true });
      cy.get('[data-cy=chart-section]').should('be.visible');

      // Generate a chart first
      cy.get('[data-cy=chart-option-bar]').click()

      // Should have filter controls
      cy.get('[data-cy=filters]').should('be.visible')
      cy.get('[data-cy=filter-category]').should('exist')
      cy.get('[data-cy=filter-region]').should('exist')

      // Apply filter and verify chart updates
      cy.get('[data-cy=filter-category]').select('Electronics')
      cy.get('[data-cy=chart-bar]').should('be.visible')

      // Clear filter
      cy.get('[data-cy=clear-filters]').click()
      cy.get('[data-cy=filter-category]').should('have.value', '')
    })

    it('should handle sorting and data manipulation', () => {
      cy.get('[data-cy=file-upload-input]').selectFile('cypress/fixtures/sort-data.csv', { force: true });
      cy.get('[data-cy=chart-section]').should('be.visible');

      // Should have sorting controls
      cy.get('[data-cy=sort-controls]').should('be.visible')
      cy.get('[data-cy=sort-field]').should('exist')
      cy.get('[data-cy=sort-direction]').should('exist')

      // Apply sorting
      cy.get('[data-cy=sort-field]').select('Score')
      cy.get('[data-cy=sort-direction]').select('desc')
      cy.get('[data-cy=apply-sort]').click()

      // Verify data is sorted in preview
      cy.get('[data-cy=data-preview] tbody tr').first().should('contain', 'Alice')
    })
  });

  describe('Performance', () => {
    it('should handle large datasets efficiently (performance test)', () => {
      cy.get('[data-cy=file-upload-input]').selectFile('cypress/fixtures/large-dataset.csv', { force: true });
      cy.get('[data-cy=chart-section]').should('be.visible');

      // Should handle upload within reasonable time
      cy.get('[data-cy=upload-success]', { timeout: 10000 }).should('be.visible')

      // Generate chart and measure performance
      const startTime = Date.now()
      cy.get('[data-cy=chart-option-bar]').click()
      cy.get('[data-cy=chart-bar]').should('be.visible').then(() => {
        const endTime = Date.now()
        const renderTime = endTime - startTime
        expect(renderTime).to.be.lessThan(3000) // Chart should render within 3 seconds
      })
    })

    it('should maintain responsive filtering performance', () => {
      // Upload medium dataset
      cy.get('[data-cy=file-upload-input]').selectFile('cypress/fixtures/filter-performance.csv', { force: true });
      cy.get('[data-cy=chart-section]').should('be.visible');

      cy.get('[data-cy=chart-option-bar]').click()

      // Measure filter response time
      cy.get('[data-cy=filter-category]').select('Category1')
      cy.get('[data-cy=chart-bar]').should('be.visible')

      // Filter should update quickly (tested via rapid successive filters)
      for (let i = 0; i < 3; i++) {
        cy.get('[data-cy=filter-category]').select(`Category${i}`)
        cy.get('[data-cy=chart-bar]').should('be.visible')
      }
    })
  })

  describe('User Experience', () => {
    it('should be responsive across different screen sizes', () => {
      cy.get('[data-cy=file-upload-input]').selectFile('cypress/fixtures/responsive-test.csv', { force: true });
      cy.get('[data-cy=chart-section]').should('be.visible');

      // Test desktop view
      cy.viewport(1200, 800)
      cy.get('[data-cy=chart-option-bar]').click()
      cy.get('[data-cy=chart-bar]').should('be.visible')

      // Test tablet view
      cy.viewport(768, 1024)
      cy.get('[data-cy=chart-bar]').should('be.visible')

      // Test mobile view
      cy.viewport(375, 667)
      cy.get('[data-cy=chart-bar]').should('be.visible')
    })

    it('should provide clear error handling for invalid files', () => {
      // Test invalid file type
      cy.get('[data-cy=file-upload-input]').selectFile('cypress/fixtures/invalid.txt', { force: true });
      cy.get('[data-cy=chart-section]').should('not.exist');

      cy.get('[data-cy=error-message]').should('be.visible')
      cy.get('[data-cy=error-message]').should('contain.text', 'Invalid file format')

      // Test malformed CSV
      cy.get('[data-cy=file-upload-input]').selectFile('cypress/fixtures/malformed.csv', { force: true });

      cy.get('[data-cy=error-message]').should('be.visible')
      cy.get('[data-cy=error-message]').should('contain.text', 'CSV format error')
    })

    it('should provide data export capabilities', () => {
      cy.get('[data-cy=file-upload-input]').selectFile('cypress/fixtures/export-test.csv', { force: true });
      cy.get('[data-cy=chart-section]').should('be.visible');

      cy.get('[data-cy=chart-option-bar]').click()

      // Should have export options
      cy.get('[data-cy=export-controls]').should('be.visible')
      cy.get('[data-cy=export-png]').should('exist')
      cy.get('[data-cy=export-svg]').should('exist')
      cy.get('[data-cy=export-data]').should('exist')

      // Test chart export (PNG)
      cy.get('[data-cy=export-png]').click()
      // Verify download was initiated (file should be downloaded)
      cy.readFile('cypress/downloads/chart.png', { timeout: 5000 }).should('exist')
    })
  })

  describe('Data Integrity', () => {
    it('should correctly parse different data types', () => {
      cy.get('[data-cy=file-upload-input]').selectFile('cypress/fixtures/data-types.csv', { force: true });
      cy.get('[data-cy=chart-section]').should('be.visible');

      cy.get('[data-cy=data-preview]').should('be.visible')

      // Should recognize different data types
      cy.get('[data-cy=column-info]').should('contain.text', 'Number: Age, Salary')
      cy.get('[data-cy=column-info]').should('contain.text', 'Date: StartDate')
      cy.get('[data-cy=column-info]').should('contain.text', 'Boolean: IsActive')
      cy.get('[data-cy=column-info]').should('contain.text', 'String: Name')
    })

    it('should handle missing data gracefully', () => {
      cy.get('[data-cy=file-upload-input]').selectFile('cypress/fixtures/missing-data.csv', { force: true });
      cy.get('[data-cy=chart-section]').should('not.exist');

      // Should show data quality warnings
      cy.get('[data-cy=data-quality]').should('be.visible')
      cy.get('[data-cy=missing-values-warning]').should('contain.text', 'Missing values detected')

      // Should still generate charts
      cy.get('[data-cy=chart-option-bar]').click()
      cy.get('[data-cy=chart-bar]').should('be.visible')
    })
  })

  describe('Accessibility', () => {
    it('should meet basic accessibility requirements', () => {
      cy.get('[data-cy=file-upload-button]').should('have.attr', 'aria-label')
      cy.get('[data-cy=file-upload-input]').should('have.attr', 'aria-describedby')

      cy.get('[data-cy=file-upload-input]').selectFile('cypress/fixtures/a11y-test.csv', { force: true });
      cy.get('[data-cy=chart-section]').should('be.visible');

      cy.get('[data-cy=chart-option-bar]').click()

      // Charts should have proper ARIA labels
      cy.get('[data-cy=chart-bar]').should('have.attr', 'aria-label')
      cy.get('[data-cy=chart-bar]').should('have.attr', 'role', 'img')

      // Should be keyboard navigable
      cy.get('[data-cy=chart-types]').within(() => {
        cy.get('button').first().focus()
        cy.focused().type('{rightarrow}')
        cy.focused().should('not.be', cy.get('button').first())
      })
    })

    it('should provide alternative text representations', () => {
      cy.get('[data-cy=file-upload-input]').selectFile('cypress/fixtures/alt-text.csv', { force: true });
      cy.get('[data-cy=chart-section]').should('be.visible');

      cy.get('[data-cy=chart-option-pie]').click()

      // Should provide data table alternative
      cy.get('[data-cy=chart-data-table]').should('exist')
      cy.get('[data-cy=toggle-data-table]').click()
      cy.get('[data-cy=chart-data-table]').should('be.visible')
      cy.get('[data-cy=chart-data-table] tbody tr').should('have.length', 3)
    })
  })

  describe('Advanced Feature', () => {
    it('should support chart customization options', () => {
      cy.get('[data-cy=file-upload-input]').selectFile('cypress/fixtures/customization.csv', { force: true });
      cy.get('[data-cy=chart-section]').should('be.visible');

      cy.get('[data-cy=chart-option-line]').click()

      // Should have customization panel
      cy.get('[data-cy=chart-customization]').should('be.visible')
      cy.get('[data-cy=color-picker]').should('exist')
      cy.get('[data-cy=chart-title-input]').should('exist')
      cy.get('[data-cy=axis-labels]').should('exist')

      // Apply customizations
      cy.get('[data-cy=chart-title-input]').type('Monthly Sales Data')
      cy.get('[data-cy=apply-customization]').click()

      // Verify customization applied
      cy.get('[data-cy=chart-line]').should('contain.text', 'Monthly Sales Data')
    })

    it('should support multiple simultaneous charts', () => {
      cy.get('[data-cy=file-upload-input]').selectFile('cypress/fixtures/multi-chart.csv', { force: true });
      cy.get('[data-cy=chart-section]').should('be.visible');

      // Create multiple charts
      cy.get('[data-cy=add-chart]').click()
      cy.get('[data-cy=chart-option-bar]').click()
      // ^ sets the first chart to "bar"

      cy.get('[data-cy=add-chart]').click()
      cy.get('[data-cy=chart-2-option-line]').click()
      // ^ sets the second chart to "line"

      // Should display both charts
      cy.get('[data-cy=chart-container]').should('have.length', 2)
      cy.get('[data-cy=chart-bar]').should('be.visible')
      cy.get('[data-cy=chart-line]').should('be.visible')

      // Should be able to remove charts
      cy.get('[data-cy=remove-chart]').first().click()
      cy.get('[data-cy=chart-container]').should('have.length', 1)
    })

    it('should provide data aggregation and grouping', () => {
      cy.get('[data-cy=file-upload-input]').selectFile('cypress/fixtures/aggregation.csv', { force: true });
      cy.get('[data-cy=chart-section]').should('be.visible');

      // Should have aggregation options
      cy.get('[data-cy=aggregation-controls]').should('be.visible')
      cy.get('[data-cy=group-by]').should('exist')
      cy.get('[data-cy=aggregate-function]').should('exist')

      // Apply grouping
      cy.get('[data-cy=group-by]').select('Category')
      cy.get('[data-cy=aggregate-function]').select('sum')
      cy.get('[data-cy=apply-aggregation]').click()

      // Generate chart with aggregated data
      cy.get('[data-cy=chart-option-bar]').click()
      cy.get('[data-cy=chart-bar]').should('be.visible')

      // Verify aggregation worked
      cy.get('[data-cy=data-preview] tbody tr').should('have.length', 2) // Should be grouped into 2 categories
    })
  })

  describe('File Sizes', () => {
    it.skip('should handle maximum file size limits', () => {
      // This would test the 10MB limit mentioned in requirements
      // NOTE: Creating a 10MB file in Cypress might be resource intensive
      // This is a placeholder for the concept
      cy.get('[data-cy=file-size-info]').should('contain.text', 'Maximum file size: 10MB')
    });

    it('should handle minimum data requirements', () => {
      // Test with insufficient data
      cy.get('[data-cy=file-upload-input]').selectFile('cypress/fixtures/minimal.csv', { force: true });
      cy.get('[data-cy=chart-section]').should('not.exist');

      cy.get('[data-cy=warning-message]').should('contain.text', 'Insufficient data for meaningful visualization')
      cy.get('[data-cy=chart-types] button').should('be.disabled')
    });
  });
});

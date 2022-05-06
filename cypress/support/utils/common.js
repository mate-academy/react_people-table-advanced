export const page = {
    checkColumnIsSorted(index, direction, dataType) {
        if (direction === 'desc') {
            cy.get(`tbody > tr > :nth-child(${index})`)
                .then((cells) => {
                    const sortedArr = cells.toArray()
                        .map($e1 => $e1.textContent)
                        .sort((a, b) => {
                            return b.localeCompare(a);
                        })
                    const arr = cells
                        .toArray()
                        .map($e1 => $e1.textContent);

                    expect(arr).to.deep.eq(sortedArr);
                })
        } else if (direction === 'asc') {
            cy.get(`tbody > tr > :nth-child(${index})`)
                .then((cells) => {
                    const sortedArr = cells.toArray()
                        .map($e1 => $e1.textContent)
                        .sort();

                    const unsortedArr = cells
                        .toArray()
                        .map($e1 => $e1.textContent);

                    expect(unsortedArr).to.deep.eq(sortedArr);
                })
        }
        else if (dataType === 'number') {
            cy.get(`tbody > tr > :nth-child(${index})`)
                .then((cells) => {
                    const sortedArr = cells.toArray()
                        .map($e1 => parseInt($e1.textContent))
                        .sort();

                    const unsortedArr = cells
                        .toArray()
                        .map($e1 => parseInt($e1.textContent));

                    expect(unsortedArr).to.deep.eq(sortedArr);
                })
        }
    },
    checkColumnIsNotSorted(index) {
        cy.get(`tbody > tr > :nth-child(${index})`)
            .then((cells) => {
                const sortedArr = cells.toArray()
                    .map($e1 => $e1.textContent)
                    .sort();

                const unsortedArr = cells
                    .toArray()
                    .map($e1 => $e1.textContent);

                expect(unsortedArr).to.not.deep.eq(sortedArr);
            })
    },
    checkIfHrefIncludes(name, value) {
        cy.contains(name)
            .invoke('attr', 'href')
            .should('include', value);
    }
}

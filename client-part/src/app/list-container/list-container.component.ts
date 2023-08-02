import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
	selector: 'app-list-container',
	templateUrl: './list-container.component.html',
	styleUrls: ['./list-container.component.css'],
})
export class ListContainerComponent implements OnInit {
	public text: string = ''
	constructor(private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		switch (this.activatedRoute.snapshot.routeConfig.path) {
			case 'active-orders':
				this.text = 'active'
				break
			case 'completed-orders':
				this.text = 'completed'
				break
			case 'products':
				this.text = 'products'
				break
		}
	}
}

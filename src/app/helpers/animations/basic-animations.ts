import { animate, animateChild, group, query, state, style, transition, trigger } from "@angular/animations";

const defaultSlideRightAnimations = [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
  ]),
  query(':enter', [
    style({ left: '-100%' })
  ]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('350ms ease-out', style({ left: '100%', opacity: 0 }))
    ]),
    query(':enter', [
      animate('350ms ease-out', style({ left: '0%' }))
    ]),
    query('@*', animateChild(), {optional: true})
  ]),
];
const defaultSlideLeftAnimations = [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      right: 0,
      width: '100%'
    })
  ]),
  query(':enter', [
    style({ right: '-100%' })
  ]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('350ms ease-out', style({ right: '100%', opacity: 0 }))
    ]),
    query(':enter', [
      animate('350ms ease-out', style({ right: '0%' }))
    ]),
    query('@*', animateChild(), {optional: true})
  ]),
];

export const showStateTrigger = trigger('show',[
    transition(':enter',[
        style({
            opacity:0
        }),
        animate(350, style({
            opacity: 1,
        }))
    ]),
    transition(':leave',[
        animate(350, style({
            opacity: 0,
        }))
    ])
]);

export const routesAnimations =
  trigger('routeAnimations', [
    transition('transcriptionsPage => dictionariesMainPage, dictionariesMainPage => usersMainPage, transcriptionsPage => usersMainPage', defaultSlideLeftAnimations),
    transition('* <=> *', defaultSlideRightAnimations),
    transition('* => notfoundPage', []),//TODO: Animação de pop https://codepen.io/Jtwa/pen/dYvLpN
  ]);

export const usersRoutingAnimations = trigger('usersRouteAnimations', [
  transition('* <=> *', [    
    query(':enter, :leave', style({ position: 'fixed', width:'100%' }),{optional: true}),
    group([ 
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.35s ease-in-out', style({ transform: 'translateX(0%)' }))
      ],{optional: true}),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.35s ease-in-out', style({ transform: 'translateX(-100%)' }))
      ],{optional: true}),
    ])
  ])
]);

export const slideTransition = trigger('routeAnimations', [
    transition('* <=> *', [    
      query(':enter, :leave', style({ position: 'fixed', width:'100%' })),
      group([ 
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('0.35s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.35s ease-in-out', style({ transform: 'translateX(-100%)' }))]),
      ])
    ])
]);